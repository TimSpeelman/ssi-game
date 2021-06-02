import { ActionDef } from '../../definition/Action/ActionDef';
import { ActionDesc } from '../../description/Step/ActionDesc';
import { ScenarioState } from '../State/ScenarioState';
import { ComputedStep } from './ComputedStep';
import { IOutcome } from './IOutcome';
import { IValidationResult } from './IValidationResult';

/**
 * The player programs Actions. The action type defines what preconditions must be met before this action can occur and
 * computes the results of the action, which results in a new state.
 */
export abstract class Action<Props = any> {
    /** Type Name used for serialization */
    protected abstract readonly typeName: string;

    constructor(readonly id: string, readonly props: Props) {}

    /** Compute the results of this action */
    public computeStep(preState: ScenarioState): ComputedStep {
        const validation = this.validatePreConditions(preState);
        const outcomes = this.computeOutcomes(preState);
        const postState = outcomes
            .reduce((result, outcome) => outcome.computeState(result), preState)
            .withUpdate((s) => ({ ...s, valid: s.valid && validation.every((v) => v.success) }));

        return new ComputedStep({
            action: this,
            outcomes,
            validation,
            preState,
            postState,
        });
    }

    /** Given a scenario state, check if the preconditions are met to perform this action */
    abstract validatePreConditions(state: ScenarioState): IValidationResult[];

    /** Given a scenario state, compute the outcomes of this action */
    abstract computeOutcomes(state: ScenarioState): IOutcome[];

    /** Provide a generic description of this action for viewing purposes */
    abstract describe(state: ScenarioState): ActionDesc;

    serialize(): ActionDef<Props> {
        return { id: this.id, props: this.props, typeName: this.typeName };
    }
}
