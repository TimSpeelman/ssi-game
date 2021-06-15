import { Language } from '../../../intl/Language';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { Consent } from '../../assets/data/abc/Consent';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export interface Props {
    verifierId: string;
    subjectId: string;
    verifierNym: string;
    subjectNym: string;
    attributeName: string;
}

export class PresentationConsent extends Action<Props> {
    typeName = 'PresentationConsent';

    static config: ActionFormConfig<keyof Props> = {
        typeName: 'PresentationConsent',
        title: 'Toestemming voor Presentatie',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            subjectId: { type: 'actor', title: 'Subject' },
            verifierNym: { type: 'string', title: 'Pseudoniem van Verifier' },
            subjectNym: { type: 'string', title: 'Pseudoniem van Subject' },
            attributeName: { type: 'string', title: 'Attribuutnaam' },
        },
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const consent = new Consent(this.id + '1', {
            attributeName: this.props.attributeName,
            verifierId: this.props.verifierId,
            subjectId: this.props.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: consent })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.subjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'PresentationConsent',
            from: subject,
            to: verifier,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Geef toestemming om ${this.props.attributeName} credential te gebruiken`,
                [Language.EN]: `Geef toestemming om ${this.props.attributeName} credential te gebruiken`,
            },
            sub: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            long: `${ucFirst(subject.nounPhrase)} geeft ${verifier.nounPhrase} toestemming om het attribuut ${
                this.props.attributeName
            } te gebruiken.`,
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
