import { Action } from '../../model/game/Action';
import { IOutcome } from '../../model/game/IOutcome';
import { IValidationResult } from '../../model/game/IValidationResult';
import { ScenarioState } from '../../model/game/ScenarioState';
import { ActionFormConfig } from '../../model/view/ActionFormConfig';
import { ucFirst } from '../../util/util';
import { GreenFlag } from '../assets/Flag';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';
import { InteractionDescription, Locality } from './InteractionDescription';

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
        create: (id, d) => new GrantGreenFlag(id, d),
    };

    validatePreConditions(): IValidationResult[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        const flag: GreenFlag = {
            description: this.props.description,
            kind: 'flag',
            type: 'green-flag',
            success: true,
            id: this.id + '-1',
        };
        return [new GainAssetOutcome({ actorId: this.props.toId, asset: flag })];
    }

    describe(state: ScenarioState): InteractionDescription {
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
