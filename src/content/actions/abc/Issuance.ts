import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AttributeProof } from '../../assets/data/abc/AttributeProof';
import { Wallet } from '../../assets/software/Wallet';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

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
        typeName: 'Issuance',
        title: {
            [Language.NL]: 'Uitgifte van credential',
            [Language.EN]: 'Issuance of credential',
        },
        fields: {
            issuerId: { type: 'actor', title: translations.issuer },
            subjectId: { type: 'actor', title: translations.subject },
            issuerNym: { type: 'string', title: translations.issuerPseudonym },
            subjectNym: { type: 'string', title: translations.subjectPseudonym },
            attributeName: { type: 'string', title: translations.attributeName },
            attributeValue: { type: 'string', title: translations.attributeValue },
        },
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const subjectWallet = state.props.byActor[this.props.subjectId].assets.find((a) => a instanceof Wallet);
        const attr = new AttributeProof(this.id + '1', {
            parentId: subjectWallet?.id,
            name: this.props.attributeName,
            value: this.props.attributeValue,
            issuerId: this.props.issuerNym,
            subjectId: this.props.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: this.props.subjectId, asset: attr })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.subjectId].actor;
        const issuer = state.props.byActor[this.props.issuerId].actor;
        return {
            id: this.id,
            type: 'Issuance',
            from: issuer,
            from_mode: 'issuing',
            to: subject,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Uitgave van ${this.props.attributeName} credential`,
                [Language.EN]: `Issuance of ${this.props.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.props.subjectNym}, Issuer: ${this.props.issuerNym}`,
                [Language.EN]: `Subject: ${this.props.subjectNym}, Issuer: ${this.props.issuerNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(issuer.nounPhrase)} geeft een ${
                    this.props.attributeName
                } credential uit aan ${subject.nounPhrase}.`,
                [Language.EN]: `${ucFirst(issuer.nounPhrase)} issues a ${this.props.attributeName} credential to ${
                    subject.nounPhrase
                }.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
