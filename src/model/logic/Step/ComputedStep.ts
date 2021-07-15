import { StepDesc } from '../../description/Step/StepDesc';
import { ScenarioState } from '../State/ScenarioState';
import { Action, ActionStatus } from './Action';
import { IOutcome } from './IOutcome';
import { IValidationResult } from './IValidationResult';

/**
 * A computed step collects the results of an Action occurring during a particular (pre) state,
 * resulting in some outcomes that produce a new state.
 */
export class ComputedStep implements Props {
    readonly action: Action<any>;
    readonly outcomes: IOutcome[];
    readonly postState: ScenarioState;
    readonly preState: ScenarioState;
    readonly status: ActionStatus;
    readonly validation: IValidationResult[];

    constructor(props: Props) {
        this.action = props.action;
        this.outcomes = props.outcomes;
        this.postState = props.postState;
        this.preState = props.preState;
        this.status = props.status;
        this.validation = props.validation;
    }

    get succeeds() {
        return !!this.status.dependenciesAreValid && !!this.status.preConditionsAreMet;
    }

    describe(): StepDesc {
        return {
            action: this.action.describe(this.preState, this),
            active: this.status.scenarioIsValidBeforeStep,
            outcomes: this.outcomes.map((o) => o.describe(this.preState)),
            result: this.postState.describe(),
            success: !!this.status.dependenciesAreValid && !!this.status.preConditionsAreMet,
            validation: this.validation.map((v) => v.describe(this.preState)),
        };
    }
}

export interface Props {
    action: Action<any>;
    outcomes: IOutcome[];
    postState: ScenarioState;
    preState: ScenarioState;
    status: ActionStatus;
    validation: IValidationResult[];
}
