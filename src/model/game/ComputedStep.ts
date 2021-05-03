import { ScenarioStepDescription } from '../view/ScenarioStepDescription';
import { Action } from './Action';
import { IOutcome } from './IOutcome';
import { ScenarioState } from './ScenarioState';

/**
 * A computed step collects the results of an Action occurring during a particular (pre) state,
 * resulting in some outcomes that produce a new state.
 */
export class ComputedStep {
    constructor(readonly props: Props) {}

    describe(): ScenarioStepDescription {
        return {
            action: this.props.action.describe(this.props.preState),
            outcomes: this.props.outcomes.map((o) => o.describe(this.props.preState)),
            result: this.props.postState.describe(),
        };
    }
}

export interface Props {
    preState: ScenarioState;
    action: Action;
    outcomes: IOutcome[];
    postState: ScenarioState;
}
