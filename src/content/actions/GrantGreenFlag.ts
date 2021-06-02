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
        title: 'Groene vlag toekennen',
        fields: {
            fromId: { type: 'actor', title: 'Van Actor' },
            toId: { type: 'actor', title: 'Naar Actor' },
            description: { type: 'string', title: 'Omschrijving' },
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
            description: `${ucFirst(from.nounPhrase)} geeft ${to.name} de groene vlag`,
            sub: desc,
            from: from,
            to: to,
            long: `${ucFirst(from.nounPhrase)} geeft ${to.name} de groene vlag.`,
            locality: Locality.AT_CENTER,
        };
    }
}
