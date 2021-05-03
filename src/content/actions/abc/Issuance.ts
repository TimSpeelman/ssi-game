import { Action } from '../../../model/game/Action';
import { IOutcome } from '../../../model/game/IOutcome';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { ScenarioStateDescription } from '../../../model/view/ScenarioStateDescription';
import { AttributeProof } from '../../assets/data/abc/AttributeProof';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';
import { InteractionDescription } from '../InteractionDescription';

export interface Props {
    issuerId: string;
    subjectId: string;
    issuerNym: string;
    subjectNym: string;
    attributeName: string;
    attributeValue: string;
}

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Issuance extends Action<Props> {
    typeName = 'Issuance';

    static config: ActionFormConfig<keyof Props> = {
        title: 'Uitgifte van credential',
        fields: {
            issuerId: { type: 'actor', title: 'Issuer' },
            subjectId: { type: 'actor', title: 'Subject' },
            issuerNym: { type: 'string', title: 'Pseudoniem van issuer' },
            subjectNym: { type: 'string', title: 'Pseudoniem van subject' },
            attributeName: { type: 'string', title: 'Attribuutnaam' },
            attributeValue: { type: 'string', title: 'Attribuutwaarde' },
        },
        create: (id, d) => new Issuance(id, d),
    };

    validatePreConditions(state: ScenarioStateDescription): string[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioStateDescription): IOutcome[] {
        const attr: AttributeProof = {
            kind: 'data',
            type: 'attribute-proof',
            name: this.props.attributeName,
            value: this.props.attributeValue,
            issuerId: this.props.issuerNym,
            subjectId: this.props.subjectNym,
        };
        return [new GainAssetOutcome({ actorId: this.props.subjectId, asset: attr })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.subjectId].actor;
        const issuer = state.actors[this.props.issuerId].actor;
        return {
            id: this.id,
            type: 'Issuance',
            from: issuer,
            from_mode: 'issuing',
            to: subject,
            to_mode: 'phone',
            description: `Uitgave van ${this.props.attributeName} credential`,
            sub: `Subject: ${this.props.subjectNym}, Issuer: ${this.props.issuerNym}`,
            long: `${ucFirst(issuer.nounPhrase)} geeft een ${this.props.attributeName} credential uit aan ${
                subject.name
            }.`,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}