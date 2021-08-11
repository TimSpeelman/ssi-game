import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { format } from '../../../util/util';
import { AttributeRequest } from '../assets/AttributeRequest';
import { Pseudonym } from '../assets/Pseudonym';
import { Wallet } from '../assets/Wallet';
import { CommonProps } from '../common/props';
import { urlActor } from '../common/util';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';
import { ValidationResult } from '../validations/ValidationResult';

export const Schema = BaseSchema.extend({
    typeName: 'PresentationRequest',
    title: {
        NL: 'Verzoek voor Presentatie',
        EN: 'Request for Presentation',
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

    protected getSubjectWallet(state: ScenarioState) {
        const { subject } = this.evaluateProps(state);
        return subject!.assets.find((a) => a instanceof Wallet);
    }

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        const wallet = this.getSubjectWallet(state);
        if (!wallet) {
            return [
                new ValidationResult(false, {
                    NL: 'Subject heeft een wallet nodig om een verzoek voor presentatie te kunnen ontvangen.',
                    EN: 'Subject needs a wallet to receive a presentation request.',
                }),
            ];
        }

        return [];
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const subjectWallet = props.subject!.assets.find((a) => a instanceof Wallet);

        if (!subjectWallet) return [];

        const req = new AttributeRequest(
            this.id + '1',
            {
                attributeName: this.defProps.attributeName,
                verifier: this.defProps.verifier,
                subject: this.defProps.subjectNym,
            },
            false,
            subjectWallet?.id,
        );
        return [new GainAssetOutcome({ actorId: this.defProps.subject, asset: req })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);
        const subject = props.subject!.actor;
        const verifier = props.verifier!.actor;
        const subjectNym: Pseudonym | undefined = props.subjectNym;
        const verifierNym: Pseudonym | undefined = props.verifierNym;

        const base = {
            from: verifier,
            to: subject,
        };

        if (!subjectNym || !verifierNym) {
            return base;
        }

        return {
            ...base,
            to_nym: subjectNym?.id,
            from_nym: verifierNym?.id,
            to_mode: 'phone',
            title: {
                NL: `Vraag om "${this.defProps.attributeName}" credential te tonen`,
                EN: `Request for presentation of "${this.defProps.attributeName}" credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier}, Verifier: ${verifierNym?.defProps.identifier}`,
                EN: `Subject: ${subjectNym?.defProps.identifier}, Verifier: ${verifierNym?.defProps.identifier}`,
            },
            long: {
                NL: format(
                    //
                    (s) => `${s.verifier} verzoekt ${s.subject} om het attribuut ${s.attr} te presenteren.`,
                    {
                        verifier: urlActor(verifier, true),
                        subject: urlActor(subject),
                        attr: this.defProps.attributeName,
                    },
                ),
                EN: format(
                    //
                    (s) => `${s.verifier} requests ${s.subject} to present the attribute ${s.attr}.`,
                    {
                        verifier: urlActor(verifier, true),
                        subject: urlActor(subject),
                        attr: this.defProps.attributeName,
                    },
                ),
            },
        };
    }
}

export const PresentationRequestType = new ActionType(Schema, (id, props) => new PresentationRequest(id, props));
