import { allActors } from '../../config/actors';
import { Actor } from '../../data/actor/Actor';
import {
    ActorState,
    Scenario,
    ScenarioProps,
    ScenarioStateDescription,
    ScenarioStepDescription,
} from '../../data/scenario/Scenario';
import { w1th } from '../../util/w1th';
import { ScenarioState } from './state';

export const root = (r: any): ScenarioState => r.scenario;
export const selectScenario = (r: any): Scenario => new Scenario(root(r).scenario);
export const selectScenarioProps = (r: any): ScenarioProps => root(r).scenario;
export const selectSteps = (r: any): ScenarioStepDescription[] => new Scenario(root(r).scenario).describe().steps;
export const selectActiveState = (r: any): ScenarioStateDescription =>
    w1th(selectActiveStep(r), (currentStep) => (currentStep ? currentStep.result : selectScenarioProps(r).initial));
export const selectActiveStep = (r: any): ScenarioStepDescription | undefined =>
    selectSteps(r).find((step) => step.action.id === selectActiveStepId(r));
export const selectActiveStepId = (r: any): string | undefined => root(r).activeStepId;
export const selectActiveStepIndex = (r: any): number =>
    selectSteps(r).findIndex((step) => step.action.id === selectActiveStepId(r));
export const selectSelectedStep = (r: any): ScenarioStepDescription | undefined =>
    w1th(selectSelectedStepId(r), (id) => (!id ? undefined : selectSteps(r).find((step) => step.action.id === id)));
export const selectSelectedStepId = (r: any): string | undefined => root(r).selectedStepId;
export const selectSelectedActorId = (r: any): string | undefined => root(r).selectedActorId;
export const selectUnusedActors = (r: any): Actor[] =>
    Object.values(allActors).filter((a) => !(a.id in root(r).scenario.initial.actors));
export const selectUsedActors = (r: any): Actor[] =>
    Object.values(allActors).filter((a) => a.id in root(r).scenario.initial.actors);
export const selectUsedActorsState = (r: any): ActorState[] => Object.values(root(r).scenario.initial.actors);

export const selectSelectedActor = (r: any): ActorState | undefined =>
    w1th(root(r).selectedActorId, (id) => (id ? root(r).scenario.initial.actors[id] : undefined));

export const selectSnackbarIsOn = (r: any) => root(r).snackbarOn;
