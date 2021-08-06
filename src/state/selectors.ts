import { createSelector } from 'reselect';
import { Language } from '../intl/Language';
import { ActionDef } from '../model/definition/Action/ActionDef';
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
import { keyBy, mergeRecords } from '../util/util';
import { w1th } from '../util/w1th';
import { ProjectState } from './project/state';
import { RootState } from './state';

export const root = (r: any): RootState => r.scenario;
// export const root = (r: any): RootState => r.scenario.present;
export const rootPr = (r: any): ProjectState => root(r).activeProject.present;

export const selectUndoable = (r: any): boolean => root(r).activeProject.past.length > 0;
export const selectRedoable = (r: any): boolean => root(r).activeProject.future.length > 0;

export const selectPersistableProject = (r: any): PersistedProject =>
    projectStateToPersistable(root(r).activeProject.present);

export const selectLang = (r: any): Language => root(r).language;

export const selectManualOpen = (r: any): boolean => root(r).userManualOpen;

export const selectAllProjects = (r: any): ProjectState[] => [
    rootPr(r),
    ...root(r).inactiveProjects.map((p) => p.present),
];
export const selectInactiveProjects = (r: any): ProjectState[] => root(r).inactiveProjects.map((p) => p.present);

export const selectActiveProjectName = (r: any) => rootPr(r).name;

// Definition
export const selectScenarioDef = (r: any): ScenarioDef => rootPr(r).scenario;
export const selectScenarioMeta = (r: any): ScenarioMeta => selectScenarioDef(r).meta;
/** Involved actors are actors that are involved in at least one step */
export const selectIdsOfInvolvedActors = (r: any): Record<string, true> =>
    selectStepDescs(r).reduce((ids, step) => ({ ...ids, [step.action.from.id]: true, [step.action.to.id]: true }), {});

export const selectAssetDefinitions = createSelector(selectScenarioDef, (def) =>
    mergeRecords(def.actors.map((actor) => keyBy(actor.initialAssets, 'id'))),
);

// .reduce((all, a) => ({ ...all, ...a.initialAssets.reduce((x, y) => ) }), {} as Record<string, AssetDef>)
export const selectActorDefById = (id: string) => (r: any) =>
    selectScenarioDef(r).actors.find((a) => a.definition.id === id);
export const selectAssetDefById = (id: string) => (r: any) => selectAssetDefinitions(r)[id];
export const selectActionDefById = (id: string) => (r: any) => selectScenarioDef(r).steps.find((s) => s.id === id);

// Description
export const selectScenarioDesc = createSelector(selectScenarioDef, (def) => computeScenarioFromDefinition(def));
export const selectStepDescs = (r: any): StepDesc[] => selectScenarioDesc(r).steps;
export const selectInitialStateDesc = (r: any): StateDesc => selectScenarioDesc(r).initial;

export const selectFailedStepDesc = (r: any): StepDesc | undefined =>
    w1th(selectScenarioDesc(r).failingAtIndex, (index) =>
        index !== undefined && index >= 0 ? selectStepDescs(r)[index] : undefined,
    );

// Description : Active
export const selectActiveStateDesc = (r: any): StateDesc =>
    w1th(selectActiveStepDesc(r), (currentStep) => (currentStep ? currentStep.result : selectInitialStateDesc(r)));
export const selectActiveActorDescs = (r: any): ActorDesc[] =>
    w1th(selectActiveStateDesc(r), (state) =>
        rootPr(r).scenario.actors.map((a) => state.actors[a.definition.id].actor),
    );
export const selectActiveActionDef = (r: any): ActionDef<any> | undefined =>
    rootPr(r).scenario.steps.find((s) => s.id === rootPr(r).activeStepId);
export const selectActiveStepDesc = (r: any): StepDesc | undefined =>
    selectStepDescs(r).find((step) => step.action.id === selectActiveStepId(r));
export const selectActiveStepId = (r: any): string | undefined => rootPr(r).activeStepId;
export const selectActiveStepIndex = (r: any): number =>
    selectStepDescs(r).findIndex((step) => step.action.id === selectActiveStepId(r));
export const selectNumberOfSteps = (r: any): number => selectStepDescs(r).length;

// Selection
export const selectSelectedActorId = (r: any): string | undefined => rootPr(r).selectedActorId;
export const selectSelectedActorDesc = (r: any): ActorStateDesc | undefined =>
    w1th(rootPr(r).selectedActorId, (id) => (id ? selectActiveStateDesc(r).actors[id] : undefined));
export const selectSelectedAssetId = (r: any): string | undefined => rootPr(r).selectedAssetId;
export const selectSelectedAssetNode = (r: any): AssetTreeNode | undefined =>
    w1th(rootPr(r).selectedAssetId, (id) => (id ? selectActiveStateDesc(r).assets[id] : undefined));

// Sidebar Navigation
export const selectActiveSidebarTab = (r: any): SidebarTab => root(r).activeSidebarTab;

export const selectHighlightedResource = (r: any): string | undefined => root(r).highlightedResourceId;

// Display Meta Dialog
export const selectShowMeta = (r: any) => rootPr(r).showMeta;
export const selectProjectDrawerOpen = (r: any) => root(r).projectDrawerOpen;

// Options
export const selectSnackbarIsOn = (r: any) => root(r).snackbarOn;
