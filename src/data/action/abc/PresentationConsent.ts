import { Consent } from '../../asset/data/abc/Consent';
import { GainAssetOutcome } from '../../outcome/GainAssetOutcome';
import { IOutcome } from '../../outcome/IOutcome';
import { ScenarioStateDescription } from '../../scenario/Scenario';
import { IAction } from '../IAction';
import { InteractionDescription } from '../InteractionDescription';

export class PresentationConsent implements IAction {
    constructor(
        readonly id: string,
        readonly props: {
            verifierId: string;
            subjectId: string;
            verifierNym: string;
            subjectNym: string;
            attributeName: string;
        },
    ) {}

    validatePreConditions(state: ScenarioStateDescription): string[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioStateDescription): IOutcome[] {
        const consent: Consent = {
            kind: 'data',
            type: 'consent',
            attributeName: this.props.attributeName,
            verifierId: this.props.verifierId,
            subjectId: this.props.subjectNym,
        };
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: consent })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.subjectId].actor;
        const verifier = state.actors[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'PresentationConsent',
            from: verifier,
            to: subject,
            description: `Geef toestemming om ${this.props.attributeName} credential te gebruiken`,
            sub: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            long: `${ucFirst(subject.nounPhrase)} geeft ${verifier.name} toestemming om het attribuut ${
                this.props.attributeName
            } te gebruiken.`,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
