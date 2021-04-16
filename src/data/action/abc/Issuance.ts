import { AttributeProof } from '../../asset/data/abc/AttributeProof';
import { GainAssetOutcome } from '../../outcome/GainAssetOutcome';
import { IOutcome } from '../../outcome/IOutcome';
import { ScenarioStateDescription } from '../../scenario/Scenario';
import { IAction } from '../IAction';
import { InteractionDescription } from '../InteractionDescription';

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Issuance implements IAction {
    constructor(
        readonly id: string,
        readonly props: {
            issuerId: string;
            subjectId: string;
            issuerNym: string;
            subjectNym: string;
            attributeName: string;
            attributeValue: string;
        },
    ) {}

    validatePreConditions(state: ScenarioStateDescription): string[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioStateDescription): IOutcome[] {
        const attr: AttributeProof = {
            kind: 'data',
            type: 'attribute-proof',
            name: this.props.attributeName,
            value: this.props.attributeValue,
            issuerId: this.props.issuerId,
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
            to: subject,
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
