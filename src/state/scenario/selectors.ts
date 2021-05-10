import { allActors } from '../../config/actors';
import { Actor } from '../../model/game/Actor';
import { Scenario, ScenarioProps } from '../../model/game/Scenario';
import { ActorState } from '../../model/view/ActorState';
import { ScenarioStateDescription } from '../../model/view/ScenarioStateDescription';
import { ScenarioStepDescription } from '../../model/view/ScenarioStepDescription';
import { w1th } from '../../util/w1th';
import { RootState } from './state';

export const root = (r: any): RootState => r.scenario;
export const selectScenario = (r: any): Scenario => new Scenario(root(r).scenario);
export const selectScenarioProps = (r: any): ScenarioProps => root(r).scenario;
export const selectSteps = (r: any): ScenarioStepDescription[] => new Scenario(root(r).scenario).describe().steps;
export const selectActiveState = (r: any): ScenarioStateDescription =>
    w1th(selectActiveStep(r), (currentStep) =>
        currentStep ? currentStep.result : selectScenarioProps(r).initial.describe(),
    );
export const selectFailedStep = (r: any): ScenarioStepDescription | undefined =>
    w1th(selectScenario(r).describe().failingAtIndex, (index) =>
        index !== undefined && index >= 0 ? selectSteps(r)[index] : undefined,
    );
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
    Object.values(allActors).filter((a) => !(a.id in root(r).scenario.initial.describe().actors));
export const selectUsedActors = (r: any): Actor[] =>
    Object.values(allActors).filter((a) => a.id in root(r).scenario.initial.describe().actors);
export const selectUsedActorsState = (r: any): ActorState[] =>
    Object.values(root(r).scenario.initial.describe().actors);

export const selectSelectedActor = (r: any): ActorState | undefined =>
    w1th(root(r).selectedActorId, (id) => (id ? root(r).scenario.initial.describe().actors[id] : undefined));

export const selectSnackbarIsOn = (r: any) => root(r).snackbarOn;
