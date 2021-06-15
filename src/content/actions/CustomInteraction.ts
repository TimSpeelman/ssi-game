import { Language } from '../../intl/Language';
import { ActionDesc, Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../model/view/ActionFormConfig';

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
        typeName: 'CustomInteraction',
        title: 'Vrije Interactie',
        fields: {
            fromId: { type: 'actor', title: 'Van' },
            toId: { type: 'actor', title: 'Naar' },
            description: { type: 'string', title: 'Omschrijving 1' },
            sub: { type: 'string', title: 'Omschrijving 2' },
        },
    };

    validatePreConditions(): IValidationResult[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        return [];
    }

    describe(state: ScenarioState): ActionDesc {
        return {
            id: this.id,
            type: 'CustomInteraction',
            from: state.props.byActor[this.props.fromId].actor,
            to: state.props.byActor[this.props.toId].actor,
            description: {
                [Language.NL]: this.props.description,
                [Language.EN]: this.props.description,
            },
            sub: this.props.sub,
            locality: Locality.REMOTE,
        };
    }
}
