import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AttributeRevocation } from '../../assets/data/abc/AttributeRevocation';
import { Wallet } from '../../assets/software/Wallet';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export interface Props {
    issuerId: string;
    subjectId: string;
    attributeId: string;
}

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Revocation extends Action<Props> {
    typeName = 'Revocation';

    static config: ActionFormConfig<keyof Props> = {
        typeName: 'Revocation',
        title: {
            [Language.NL]: 'Intrekken van credential',
            [Language.EN]: 'Revocation of credential',
        },
        fields: {
            issuerId: { type: 'actor', title: translations.issuer },
            subjectId: { type: 'actor', title: translations.subject },
            attributeId: { type: 'string', title: translations.attribute },
        },
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const subjectWallet = state.props.byActor[this.props.subjectId].assets.find((a) => a instanceof Wallet);
        const attr = new AttributeRevocation(this.id + '1', {
            parentId: subjectWallet?.id,
            attributeId: this.props.attributeId,
            issuerId: this.props.issuerId,
            subjectId: this.props.subjectId,
        });
        return [new GainAssetOutcome({ actorId: this.props.subjectId, asset: attr })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.subjectId].actor;
        const issuer = state.props.byActor[this.props.issuerId].actor;
        return {
            id: this.id,
            type: 'Revocation',
            from: issuer,
            to: subject,
            description: {
                [Language.NL]: `Revocatie van ${this.props.attributeId} credential`,
                [Language.EN]: `Revocation of ${this.props.attributeId} credential`,
            },
            sub: {
                [Language.NL]: '',
                [Language.EN]: '',
            },
            long: {
                [Language.NL]: `${ucFirst(issuer.nounPhrase)} trekt het attribuut ${this.props.attributeId} van ${
                    subject.nounPhrase
                } in.`,
                [Language.EN]: `${ucFirst(issuer.nounPhrase)} revokes the attribute ${this.props.attributeId} of ${
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
