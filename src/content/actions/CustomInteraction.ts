import { Action } from '../../model/game/Action/Action';
import { IOutcome } from '../../model/game/Action/IOutcome';
import { IValidationResult } from '../../model/game/Action/IValidationResult';
import { ScenarioState } from '../../model/game/Scenario/ScenarioState';
import { ActionFormConfig } from '../../model/view/ActionFormConfig';
import { InteractionDescription, Locality } from './InteractionDescription';

export interface Props {
    fromId: string;
    toId: string;
    description: string;
    sub: string;
}

/**
 * A custom interaction between two Actors
 */
export class CustomInteraction extends Action<Props> {
    typeName = 'CustomInteraction';

    static config: ActionFormConfig<keyof Props> = {
        title: 'Vrije Interactie',
        fields: {
            fromId: { type: 'actor', title: 'Van' },
            toId: { type: 'actor', title: 'Naar' },
            description: { type: 'string', title: 'Omschrijving 1' },
            sub: { type: 'string', title: 'Omschrijving 2' },
        },
        create: (id, d) => new CustomInteraction(id, d),
    };

    validatePreConditions(): IValidationResult[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        return [];
    }

    describe(state: ScenarioState): InteractionDescription {
        return {
            id: this.id,
            type: 'CustomInteraction',
            from: state.props.byActor[this.props.fromId].actor,
            to: state.props.byActor[this.props.toId].actor,
            description: this.props.description,
            sub: this.props.sub,
            locality: Locality.REMOTE,
        };
    }
}
