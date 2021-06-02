import { ScenarioStepDescription } from '../../view/ScenarioStepDescription';
import { ScenarioState } from '../ScenarioState';
import { Action } from './Action';
import { IOutcome } from './IOutcome';
import { IValidationResult } from './IValidationResult';

/**
 * A computed step collects the results of an Action occurring during a particular (pre) state,
 * resulting in some outcomes that produce a new state.
 */
export class ComputedStep {
    constructor(readonly props: Props) {}

    hasSucceeded() {
        return this.props.validation.every((v) => v.success);
    }

    describe(): ScenarioStepDescription {
        return {
            success: this.hasSucceeded(),
            active: this.props.preState.props.valid,
            action: this.props.action.describe(this.props.preState),
            validation: this.props.validation.map((v) => v.describe(this.props.preState)),
            outcomes: this.props.outcomes.map((o) => o.describe(this.props.preState)),
            result: this.props.postState.describe(),
        };
    }
}

export interface Props {
    preState: ScenarioState;
    action: Action;
    validation: IValidationResult[];
    outcomes: IOutcome[];
    postState: ScenarioState;
}
