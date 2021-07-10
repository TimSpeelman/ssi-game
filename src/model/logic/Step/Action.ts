import { ActionSchema } from '../../content/Action/ActionSchema';
import { ContentTypeProps, DefTypesOfContentTypeProps } from '../../content/Common/PropRecord/ContentTypeProps';
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
export abstract class Action<Props extends ContentTypeProps> {
    abstract readonly schema: ActionSchema<Props>;

    constructor(readonly id: string, readonly defProps: DefTypesOfContentTypeProps<Props>) {}

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
    describe(state: ScenarioState): ActionDesc {
        return {
            ...this._describe(state),
            id: this.id,
            type: this.schema.typeName,
        };
    }

    /** Provide a generic description of this action for viewing purposes */
    abstract _describe(state: ScenarioState): CustomActionDesc;

    serialize(): ActionDef<Props> {
        return { id: this.id, props: this.defProps, typeName: this.schema.typeName };
    }

    evaluateProps(state: ScenarioState) {
        return this.schema.evaluateDefinitionProps(this.defProps, state);
    }
}

export type ActionBaseDesc = Pick<ActionDesc, 'id' | 'type'>;

export type CustomActionDesc = Omit<ActionDesc, keyof ActionBaseDesc>;
