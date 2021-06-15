import { translations } from '../../intl/dictionaries';
import { Language } from '../../intl/Language';
import { ActionDesc, Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../model/view/ActionFormConfig';
import { ucFirst } from '../../util/util';
import { GreenFlag } from '../assets/GreenFlag';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export interface Props {
    fromId: string;
    toId: string;
    description: string;
}

export class GrantGreenFlag extends Action<Props> {
    typeName = 'GrantGreenFlag';

    static config: ActionFormConfig<keyof Props> = {
        typeName: 'GrantGreenFlag',
        title: {
            [Language.NL]: 'Groene vlag toekennen',
            [Language.EN]: 'Grant Green Flag',
        },
        fields: {
            fromId: { type: 'actor', title: translations.fromActor },
            toId: { type: 'actor', title: translations.toActor },
            description: { type: 'string', title: translations.description },
        },
    };

    validatePreConditions(): IValidationResult[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        const flag = new GreenFlag(this.id + '1', {
            description: this.props.description,
        });
        return [new GainAssetOutcome({ actorId: this.props.toId, asset: flag })];
    }

    describe(state: ScenarioState): ActionDesc {
        const from = state.props.byActor[this.props.fromId].actor;
        const to = state.props.byActor[this.props.toId].actor;
        const desc = this.props.description;
        return {
            id: this.id,
            type: 'GreenFlag',
            description: {
                [Language.NL]: `${ucFirst(from.nounPhrase)} geeft ${to.nounPhrase} de groene vlag`,
                [Language.EN]: `${ucFirst(from.nounPhrase)} gives ${to.nounPhrase} the green flag`,
            },
            sub: {
                [Language.NL]: desc,
                [Language.EN]: desc,
            },
            from: from,
            to: to,
            long: {
                [Language.NL]: `${ucFirst(from.nounPhrase)} geeft ${to.nounPhrase} de groene vlag.`,
                [Language.EN]: `${ucFirst(from.nounPhrase)} gives ${to.nounPhrase} the green flag.`,
            },
            locality: Locality.AT_CENTER,
        };
    }
}
