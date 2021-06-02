import { actorTypes } from '../../config/actorTypes';
import { ActionDef } from '../../model/definition/Action/ActionDef';
import { Actor } from '../../model/definition/Actor/Actor';
import { ActorType } from '../../model/definition/Actor/ActorType';
import { definitionToActor } from '../../model/definition/Actor/definitionToActor';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { ScenarioMeta } from '../../model/definition/ScenarioMeta';
import { ActorStateDesc } from '../../model/description/State/ActorStateDesc';
import { StateDesc } from '../../model/description/State/StateDesc';
import { StepDesc } from '../../model/description/Step/StepDesc';
import { Scenario } from '../../model/logic/Scenario/Scenario';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { w1th } from '../../util/w1th';
import { RootState } from './state';

export const root = (r: any): RootState => r.scenario;
export const selectActiveSidebarTab = (r: any): SidebarTab => root(r).activeSidebarTab;
export const selectScenario = (r: any): Scenario => new Scenario(root(r).scenario);
export const selectScenarioDef = (r: any): ScenarioDef => root(r).scenario;

export const selectScenarioConfiguration = (r: any): ScenarioDef => root(r).scenario;
export const selectScenarioMeta = (r: any): ScenarioMeta => selectScenarioConfiguration(r).meta;
export const selectSteps = (r: any): StepDesc[] => selectScenario(r).describe().steps;
export const selectInitialState = (r: any): StateDesc => selectScenario(r).initial.describe();

export const selectActiveState = (r: any): StateDesc =>
    w1th(selectActiveStep(r), (currentStep) => (currentStep ? currentStep.result : selectInitialState(r)));
export const selectFailedStep = (r: any): StepDesc | undefined =>
    w1th(selectScenario(r).describe().failingAtIndex, (index) =>
        index !== undefined && index >= 0 ? selectSteps(r)[index] : undefined,
    );
export const selectActiveStepSerialized = (r: any): ActionDef<any> | undefined =>
    root(r).scenario.steps.find((s) => s.id === root(r).activeStepId);
export const selectActiveStep = (r: any): StepDesc | undefined =>
    selectSteps(r).find((step) => step.action.id === selectActiveStepId(r));
export const selectActiveStepId = (r: any): string | undefined => root(r).activeStepId;
export const selectActiveStepIndex = (r: any): number =>
    selectSteps(r).findIndex((step) => step.action.id === selectActiveStepId(r));
export const selectSelectedStep = (r: any): StepDesc | undefined =>
    w1th(selectSelectedStepId(r), (id) => (!id ? undefined : selectSteps(r).find((step) => step.action.id === id)));
export const selectSelectedStepId = (r: any): string | undefined => root(r).selectedStepId;
export const selectSelectedActorId = (r: any): string | undefined => root(r).selectedActorId;
export const selectActorTypes = (r: any): ActorType[] => Object.values(actorTypes);
export const selectUsedActors = (r: any): Actor[] =>
    root(r).scenario.actors.map((a) => definitionToActor(a.definition));

export const selectSelectedActor = (r: any): ActorStateDesc | undefined =>
    w1th(root(r).selectedActorId, (id) => (id ? selectActiveState(r).actors[id] : undefined));

/** Involved actors are actors that are involved in at least one step */
export const selectInvolvedActors = (r: any): Record<string, true> =>
    selectSteps(r).reduce((ids, step) => ({ ...ids, [step.action.from.id]: true, [step.action.to.id]: true }), {});

export const selectSnackbarIsOn = (r: any) => root(r).snackbarOn;
export const selectShowMeta = (r: any) => root(r).showMeta;
