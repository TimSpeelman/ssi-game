import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AttributeRequest } from '../../assets/data/abc/AttributeRequest';
import { Wallet } from '../../assets/software/Wallet';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export interface Props {
    verifierId: string;
    subjectId: string;
    verifierNym: string;
    subjectNym: string;
    attributeName: string;
}

export class PresentationRequest extends Action<Props> {
    typeName = 'PresentationRequest';

    static config: ActionFormConfig<keyof Props> = {
        typeName: 'PresentationRequest',
        title: {
            [Language.NL]: 'Verzoek voor Presentatie',
            [Language.EN]: 'Request for Presentation',
        },
        fields: {
            verifierId: { type: 'actor', title: translations.verifier },
            subjectId: { type: 'actor', title: translations.subject },
            verifierNym: { type: 'string', title: translations.verifierPseudonym },
            subjectNym: { type: 'string', title: translations.subjectPseudonym },
            attributeName: { type: 'string', title: translations.attributeName },
        },
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const subjectWallet = state.props.byActor[this.props.subjectId].assets.find((a) => a instanceof Wallet);
        const req = new AttributeRequest(this.id + '1', {
            parentId: subjectWallet?.id,
            name: this.props.attributeName,
            verifierId: this.props.verifierId,
            subjectId: this.props.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: this.props.subjectId, asset: req })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.subjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'PresentationRequest',
            from: verifier,
            to: subject,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Vraag om ${this.props.attributeName} credential te tonen`,
                [Language.EN]: `Request for presentation of ${this.props.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
                [Language.EN]: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(verifier.nounPhrase)} verzoekt ${subject.nounPhrase} om het attribuut ${
                    this.props.attributeName
                } te presenteren.`,
                [Language.EN]: `${ucFirst(verifier.nounPhrase)} requests ${
                    subject.nounPhrase
                } for a presentation of the ${this.props.attributeName} credential.`,
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
