import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/game/State/ScenarioState';
import { Action } from '../../../model/game/Step/Action';
import { IOutcome } from '../../../model/game/Step/IOutcome';
import { IValidationResult } from '../../../model/game/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AttributeRequest } from '../../assets/data/abc/AttributeRequest';
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
        title: 'Verzoek voor Presentatie',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            subjectId: { type: 'actor', title: 'Subject' },
            verifierNym: { type: 'string', title: 'Pseudoniem van Verifier' },
            subjectNym: { type: 'string', title: 'Pseudoniem van Subject' },
            attributeName: { type: 'string', title: 'Attribuutnaam' },
        },
        create: (id, d) => new PresentationRequest(id, d),
    };

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const req: AttributeRequest = {
            kind: 'data',
            type: 'attribute-request',
            id: this.id + '-1',

            name: this.props.attributeName,
            verifierId: this.props.verifierId,
            subjectId: this.props.subjectNym,
        };
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
            description: `Vraag om ${this.props.attributeName} credential te tonen`,
            sub: `Subject: ${this.props.subjectNym}, Verifier: ${this.props.verifierNym}`,
            long: `${ucFirst(verifier.nounPhrase)} verzoekt ${subject.name} om het attribuut ${
                this.props.attributeName
            } te presenteren.`,
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
