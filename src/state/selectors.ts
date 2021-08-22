import { createSelector } from 'reselect';
import { Language } from '../intl/Language';
import { ActionDef } from '../model/definition/Action/ActionDef';
import { ActorConfig } from '../model/definition/Actor/ActorConfig';
import { ScenarioDef } from '../model/definition/Scenario/ScenarioDef';
import { ScenarioMeta } from '../model/definition/Scenario/ScenarioMeta';
import { ActorDesc } from '../model/description/Actor/ActorDesc';
import { AssetTreeNode } from '../model/description/Asset/AssetTreeNode';
import { ActorStateDesc } from '../model/description/State/ActorStateDesc';
import { StateDesc } from '../model/description/State/StateDesc';
import { StepDesc } from '../model/description/Step/StepDesc';
import { computeScenarioFromDefinition } from '../model/logic';
import { PersistedProject, projectStateToPersistable } from '../persistence/persistence';
import { SidebarTab } from '../ui/components/Sidebar/SidebarTab';
import { orderedMap } from '../util/types/OrderedMap';
import { keyBy, mergeRecords } from '../util/util';
import { w1th } from '../util/w1th';
import { ProjectState, ProjectStateWithHistory } from './project/state';
import { GameState, RootState } from './state';

export const root = (r: RootState): GameState => r.scenario;
// export const root = (r: RootState): RootState => r.scenario.present;
export const rootPr = (r: RootState): ProjectState => root(r).activeProject.history.present;

export const selectUndoable = (r: RootState): boolean => root(r).activeProject.history.past.length > 0;
export const selectRedoable = (r: RootState): boolean => root(r).activeProject.history.future.length > 0;

export const selectPersistableProject = (r: RootState): PersistedProject =>
    projectStateToPersistable(root(r).activeProject.id, root(r).activeProject.history.present);

export const selectLang = (r: RootState): Language => root(r).language;

export const selectManualOpen = (r: RootState): boolean => root(r).userManualOpen;

export const selectAllProjects = (r: RootState): ProjectState[] => [
    rootPr(r),
    ...root(r).inactiveProjects.map((p) => p.history.present),
];
export const selectInactiveProjects = (r: RootState): ProjectStateWithHistory[] => root(r).inactiveProjects;

export const selectActiveProjectName = (r: RootState) => rootPr(r).name;

// Definition
export const selectScenarioDef = (r: RootState): ScenarioDef => rootPr(r).scenario;
export const selectScenarioMeta = (r: RootState): ScenarioMeta => selectScenarioDef(r).meta;
/** Involved actors are actors that are involved in at least one step */
export const selectIdsOfInvolvedActors = (r: RootState): Record<string, true> =>
    selectStepDescs(r).reduce((ids, step) => ({ ...ids, [step.action.from.id]: true, [step.action.to.id]: true }), {});

export const selectAssetDefinitions = createSelector(selectScenarioDef, (def) =>
    mergeRecords(orderedMap.list(def.actors).map((actor) => keyBy(actor.initialAssets, 'id'))),
);

// .reduce((all, a) => ({ ...all, ...a.initialAssets.reduce((x, y) => ) }), {} as Record<string, AssetDef>)
export const selectListActorDefs = (id: string) => (r: RootState) => orderedMap.list(selectScenarioDef(r).actors);
export const selectActorDefById = (id: string) => (r: RootState): ActorConfig => selectScenarioDef(r).actors.byId[id];
export const selectAssetDefById = (id: string) => (r: RootState) => selectAssetDefinitions(r)[id];
export const selectActionDefById = (id: string) => (r: RootState) =>
    selectScenarioDef(r).steps.find((s) => s.id === id);

// Description
export const selectScenarioDesc = createSelector(selectScenarioDef, (def) => computeScenarioFromDefinition(def));
export const selectStepDescs = (r: RootState): StepDesc[] => selectScenarioDesc(r).steps;
export const selectInitialStateDesc = (r: RootState): StateDesc => selectScenarioDesc(r).initial;

export const selectFailedStepDesc = (r: RootState): StepDesc | undefined =>
    w1th(selectScenarioDesc(r).failingAtIndex, (index) =>
        index !== undefined && index >= 0 ? selectStepDescs(r)[index] : undefined,
    );

export const selectFailedStepIndex = (r: RootState): number | undefined => selectScenarioDesc(r).failingAtIndex;

// Description : Active
export const selectActiveStateDesc = (r: RootState): StateDesc =>
    w1th(selectActiveStepDesc(r), (currentStep) => (currentStep ? currentStep.result : selectInitialStateDesc(r)));
export const selectActiveActorDescs = (r: RootState): ActorDesc[] =>
    w1th(selectActiveStateDesc(r), (state) =>
        orderedMap.list(rootPr(r).scenario.actors).map((a) => state.actors[a.definition.id].actor),
    );
export const selectActiveActionDef = (r: RootState): ActionDef<RootState> | undefined =>
    rootPr(r).scenario.steps.find((s) => s.id === rootPr(r).activeStepId);
export const selectActiveStepDesc = (r: RootState): StepDesc | undefined =>
    selectStepDescs(r).find((step) => step.action.id === selectActiveStepId(r));
export const selectActiveStepId = (r: RootState): string | undefined => rootPr(r).activeStepId;
export const selectActiveStepIndex = (r: RootState): number =>
    selectStepDescs(r).findIndex((step) => step.action.id === selectActiveStepId(r));
export const selectNumberOfSteps = (r: RootState): number => selectStepDescs(r).length;
export const selectIsInitialState = (r: RootState): boolean => selectActiveStepId(r) === undefined;

// Selection
export const selectSelectedActorId = (r: RootState): string | undefined => rootPr(r).selectedActorId;
export const selectSelectedActorDesc = (r: RootState): ActorStateDesc | undefined =>
    w1th(rootPr(r).selectedActorId, (id) => (id ? selectActiveStateDesc(r).actors[id] : undefined));
export const selectSelectedActorConf = (r: RootState): ActorConfig | undefined =>
    w1th(rootPr(r).selectedActorId, (id) => (id ? selectActorDefById(id)(r) : undefined));

export const selectSelectedAssetId = (r: RootState): string | undefined => rootPr(r).selectedAssetId;
export const selectSelectedAssetNode = (r: RootState): AssetTreeNode | undefined =>
    w1th(rootPr(r).selectedAssetId, (id) => (id ? selectActiveStateDesc(r).assets[id] : undefined));

// Sidebar Navigation
export const selectActiveSidebarTab = (r: RootState): SidebarTab => root(r).activeSidebarTab;

export const selectHighlightedResource = (r: RootState): string | undefined => root(r).highlightedResourceId;

// Display Meta Dialog
export const selectShowMeta = (r: RootState): boolean => rootPr(r).showMeta;
export const selectProjectDrawerOpen = (r: RootState): boolean => root(r).projectDrawerOpen;

// Options
export const selectSnackbarIsOn = (r: RootState): boolean => root(r).snackbarOn;

export const selectEditing = (r: RootState): boolean => root(r).editing;
