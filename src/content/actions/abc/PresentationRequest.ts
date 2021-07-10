import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AttributeRequest } from '../../assets/data/abc/AttributeRequest';
import { Wallet } from '../../assets/software/Wallet';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'PresentationRequest',
    title: {
        [Language.NL]: 'Verzoek voor Presentatie',
        [Language.EN]: 'Request for Presentation',
    },
    props: {
        verifier: CommonProps.verifier,
        verifierNym: CommonProps.verifierNym,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
        attributeName: CommonProps.attributeName,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class PresentationRequest extends Action<Props> {
    schema = Schema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const subjectWallet = props.subject.assets.find((a) => a instanceof Wallet);
        const req = new AttributeRequest(this.id + '1', {
            // @ts-ignore TODO FIXME
            parentId: subjectWallet?.id,
            attributeName: this.defProps.attributeName,
            verifier: this.defProps.verifier,
            subject: this.defProps.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.subject, asset: req })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject.actor;
        const verifier = props.verifier.actor;
        return {
            from: verifier,
            to: subject,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Vraag om ${this.defProps.attributeName} credential te tonen`,
                [Language.EN]: `Request for presentation of ${this.defProps.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
                [Language.EN]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(verifier.nounPhrase)} verzoekt ${subject.nounPhrase} om het attribuut ${
                    this.defProps.attributeName
                } te presenteren.`,
                [Language.EN]: `${ucFirst(verifier.nounPhrase)} requests ${
                    subject.nounPhrase
                } for a presentation of the ${this.defProps.attributeName} credential.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationRequestType = new ActionType(Schema, (id, props) => new PresentationRequest(id, props));
