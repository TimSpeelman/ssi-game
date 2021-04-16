import { AttributeRequest } from '../../asset/data/abc/AttributeRequest';
import { GainAssetOutcome } from '../../outcome/GainAssetOutcome';
import { IOutcome } from '../../outcome/IOutcome';
import { ScenarioStateDescription } from '../../scenario/Scenario';
import { IAction } from '../IAction';
import { InteractionDescription } from '../InteractionDescription';

export class PresentationRequest implements IAction {
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
        const req: AttributeRequest = {
            kind: 'data',
            type: 'attribute-request',
            name: this.props.attributeName,
            verifierId: this.props.verifierId,
            subjectId: this.props.subjectNym,
        };
        return [new GainAssetOutcome({ actorId: this.props.subjectId, asset: req })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.subjectId].actor;
        const verifier = state.actors[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'PresentationRequest',
            from: verifier,
            to: subject,
            description: `Vraag om ${this.props.attributeName} credential te tonen`,
            sub: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            long: `${ucFirst(verifier.nounPhrase)} verzoekt ${subject.name} om het attribuut ${
                this.props.attributeName
            } te presenteren.`,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
