import { createSelector } from 'reselect';
import { Language } from '../../intl/Language';
import { ActionDef } from '../../model/definition/Action/ActionDef';
import { Actor } from '../../model/definition/Actor/Actor';
import { definitionToActor } from '../../model/definition/Actor/definitionToActor';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { ScenarioMeta } from '../../model/definition/ScenarioMeta';
import { AssetTreeNode } from '../../model/description/Asset/AssetTreeNode';
import { ActorStateDesc } from '../../model/description/State/ActorStateDesc';
import { StateDesc } from '../../model/description/State/StateDesc';
import { StepDesc } from '../../model/description/Step/StepDesc';
import { computeScenarioFromDefinition } from '../../model/logic';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { keyBy, mergeRecords } from '../../util/util';
import { w1th } from '../../util/w1th';
import { RootState } from './state';

export const root = (r: any): RootState => r.scenario;

export const selectLang = (r: any): Language => root(r).language;

// Definition
export const selectScenarioDef = (r: any): ScenarioDef => root(r).scenario;
export const selectScenarioMeta = (r: any): ScenarioMeta => selectScenarioDef(r).meta;
export const selectUsedActors = (r: any): Actor[] =>
    root(r).scenario.actors.map((a) => definitionToActor(a.definition));
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
export const selectActiveActionDef = (r: any): ActionDef<any> | undefined =>
    root(r).scenario.steps.find((s) => s.id === root(r).activeStepId);
export const selectActiveStepDesc = (r: any): StepDesc | undefined =>
    selectStepDescs(r).find((step) => step.action.id === selectActiveStepId(r));
export const selectActiveStepId = (r: any): string | undefined => root(r).activeStepId;
export const selectActiveStepIndex = (r: any): number =>
    selectStepDescs(r).findIndex((step) => step.action.id === selectActiveStepId(r));

// Selection
export const selectSelectedActorId = (r: any): string | undefined => root(r).selectedActorId;
export const selectSelectedActorDesc = (r: any): ActorStateDesc | undefined =>
    w1th(root(r).selectedActorId, (id) => (id ? selectActiveStateDesc(r).actors[id] : undefined));
export const selectSelectedAssetId = (r: any): string | undefined => root(r).selectedAssetId;
export const selectSelectedAssetNode = (r: any): AssetTreeNode | undefined =>
    w1th(root(r).selectedAssetId, (id) => (id ? selectActiveStateDesc(r).assets[id] : undefined));

// Sidebar Navigation
export const selectActiveSidebarTab = (r: any): SidebarTab => root(r).activeSidebarTab;

export const selectHighlightedResource = (r: any): string | undefined => root(r).highlightedResourceId;

// Display Meta Dialog
export const selectShowMeta = (r: any) => root(r).showMeta;

// Options
export const selectSnackbarIsOn = (r: any) => root(r).snackbarOn;
