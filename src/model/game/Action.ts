import { InteractionDescription } from '../../content/actions/InteractionDescription';
import { ScenarioStateDescription } from '../view/ScenarioStateDescription';
import { IOutcome } from './IOutcome';

/**
 * The player programs Actions. The action type defines what preconditions must be met before this action can occur and
 * computes the results of the action, which results in a new state.
 */
export abstract class Action<Props = any> {
    /** Type Name used for serialization */
    protected abstract readonly typeName: string;

    constructor(readonly id: string, readonly props: Props) {}

    /** Given a scenario state, check if the preconditions are met to perform this action */
    abstract validatePreConditions(state: ScenarioStateDescription): string[];

    /** Given a scenario state, compute the outcomes of this action */
    abstract computeOutcomes(state: ScenarioStateDescription): IOutcome[];

    /** Provide a generic description of this action for viewing purposes */
    abstract describe(state: ScenarioStateDescription): InteractionDescription;

    serialize(): SerializedAction<Props> {
        return { id: this.id, props: this.props, typeName: this.typeName };
    }
}

export interface SerializedAction<Props = any> {
    id: string;
    props: Props;
    typeName: string;
}
