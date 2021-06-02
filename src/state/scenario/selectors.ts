import { actorTypes } from '../../config/actorTypes';
import { PlainAction } from '../../model/game/Action/PlainAction';
import { Actor } from '../../model/game/Actor/Actor';
import { ActorType } from '../../model/game/Actor/ActorType';
import { definitionToActor } from '../../model/game/Actor/definitionToActor';
import { ScenarioConfig } from '../../model/game/Scenario/Config/ScenarioConfig';
import { ScenarioMeta } from '../../model/game/Scenario/Config/ScenarioMeta';
import { PlainScenario } from '../../model/game/Scenario/PlainScenario';
import { Scenario } from '../../model/game/Scenario/Scenario';
import { ActorState } from '../../model/view/ActorState';
import { ScenarioStateDescription } from '../../model/view/ScenarioStateDescription';
import { ScenarioStepDescription } from '../../model/view/ScenarioStepDescription';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { w1th } from '../../util/w1th';
import { RootState } from './state';

export const root = (r: any): RootState => r.scenario;
export const selectActiveSidebarTab = (r: any): SidebarTab => root(r).activeSidebarTab;
export const selectScenario = (r: any): Scenario => Scenario.deserialize({ props: root(r).scenario });
export const selectPlainScenario = (r: any): PlainScenario => ({ props: root(r).scenario });

export const selectScenarioConfiguration = (r: any): ScenarioConfig => root(r).scenario.config;
export const selectScenarioMeta = (r: any): ScenarioMeta => selectScenarioConfiguration(r).meta;
export const selectSteps = (r: any): ScenarioStepDescription[] => selectScenario(r).describe().steps;
export const selectInitialState = (r: any): ScenarioStateDescription => selectScenario(r).initial.describe();

export const selectActiveState = (r: any): ScenarioStateDescription =>
    w1th(selectActiveStep(r), (currentStep) => (currentStep ? currentStep.result : selectInitialState(r)));
export const selectFailedStep = (r: any): ScenarioStepDescription | undefined =>
    w1th(selectScenario(r).describe().failingAtIndex, (index) =>
        index !== undefined && index >= 0 ? selectSteps(r)[index] : undefined,
    );
export const selectActiveStepSerialized = (r: any): PlainAction<any> | undefined =>
    root(r).scenario.steps.find((s) => s.id === root(r).activeStepId);
export const selectActiveStep = (r: any): ScenarioStepDescription | undefined =>
    selectSteps(r).find((step) => step.action.id === selectActiveStepId(r));
export const selectActiveStepId = (r: any): string | undefined => root(r).activeStepId;
export const selectActiveStepIndex = (r: any): number =>
    selectSteps(r).findIndex((step) => step.action.id === selectActiveStepId(r));
export const selectSelectedStep = (r: any): ScenarioStepDescription | undefined =>
    w1th(selectSelectedStepId(r), (id) => (!id ? undefined : selectSteps(r).find((step) => step.action.id === id)));
export const selectSelectedStepId = (r: any): string | undefined => root(r).selectedStepId;
export const selectSelectedActorId = (r: any): string | undefined => root(r).selectedActorId;
export const selectActorTypes = (r: any): ActorType[] => Object.values(actorTypes);
export const selectUsedActors = (r: any): Actor[] =>
    root(r).scenario.config.actors.map((a) => definitionToActor(a.definition));

export const selectSelectedActor = (r: any): ActorState | undefined =>
    w1th(root(r).selectedActorId, (id) => (id ? selectActiveState(r).actors[id] : undefined));

/** Involved actors are actors that are involved in at least one step */
export const selectInvolvedActors = (r: any): Record<string, true> =>
    selectSteps(r).reduce((ids, step) => ({ ...ids, [step.action.from.id]: true, [step.action.to.id]: true }), {});

export const selectSnackbarIsOn = (r: any) => root(r).snackbarOn;
export const selectShowMeta = (r: any) => root(r).showMeta;
