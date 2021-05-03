import { Action } from '../../model/game/Action';
import { IOutcome } from '../../model/game/IOutcome';
import { ActionFormConfig } from '../../model/view/ActionFormConfig';
import { ScenarioStateDescription } from '../../model/view/ScenarioStateDescription';
import { InteractionDescription } from './InteractionDescription';

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

    validatePreConditions(): string[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        return [];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        return {
            id: this.id,
            type: 'CustomInteraction',
            from: state.actors[this.props.fromId].actor,
            to: state.actors[this.props.toId].actor,
            description: this.props.description,
            sub: this.props.sub,
        };
    }
}
