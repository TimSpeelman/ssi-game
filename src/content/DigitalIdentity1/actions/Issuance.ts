import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { ComputedStep } from '../../../model/logic/Step/ComputedStep';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { format } from '../../../util/util';
import { Credential } from '../assets/Credential';
import { Pseudonym } from '../assets/Pseudonym';
import { Wallet } from '../assets/Wallet';
import { CommonProps } from '../common/props';
import { urlActor } from '../common/util';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';
import { ValidationResult } from '../validations/ValidationResult';

export const Schema = BaseSchema.extend({
    typeName: 'Issuance',
    title: {
        NL: 'Uitgifte van credential',
        EN: 'Issuance of credential',
    },
    description: {
        NL:
            'Met de uitgifte van een credential krijgt het Subject de mogelijkheid een bepaald gegeven over zichzelf aan anderen te bewijzen.',
        EN: 'The issuance of a credential enables the Subject to prove something about him/herself to others.',
    },
    props: {
        issuer: CommonProps.issuer,
        issuerNym: CommonProps.issuerNym,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
        attributeName: CommonProps.attributeName,
        attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Issuance extends Action<Props> {
    schema = Schema;

    public get credentialId() {
        return this.id + '-1';
    }

    protected getSubjectWallet(state: ScenarioState) {
        const { subject } = this.evaluateProps(state);
        return subject!.assets.find((a) => a instanceof Wallet);
    }

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        const wallet = this.getSubjectWallet(state);
        if (!wallet) {
            return [
                new ValidationResult(false, {
                    NL: 'Subject heeft een wallet nodig om een credential te kunnen ontvangen.',
                    EN: 'Subject needs a wallet to receive a credential.',
                }),
            ];
        }

        return [];
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { subject } = this.evaluateProps(state);

        const subjectWallet = subject!.assets.find((a) => a instanceof Wallet);

        if (!subjectWallet) return [];

        const attr = new Credential(
            this.credentialId,
            {
                attributeName: this.defProps.attributeName,
                attributeValue: this.defProps.attributeValue,
                issuerNym: this.defProps.issuerNym,
                subjectNym: this.defProps.subjectNym,
            },
            false,
            subjectWallet.id,
        );
        return [new GainAssetOutcome({ actorId: subject!.actor.id, asset: attr })];
    }

    _describe(state: ScenarioState, step: ComputedStep): CustomActionDesc {
        const { subject, issuer, ...props } = this.evaluateProps(state);
        const { attributeName } = this.defProps;

        const subjectNym: Pseudonym | undefined = props.subjectNym;
        const issuerNym: Pseudonym | undefined = props.issuerNym;

        return {
            from: issuer!.actor,
            from_mode: 'issuing',
            from_nym: issuerNym?.id,
            to: subject!.actor,
            to_nym: subjectNym?.id,
            to_mode: 'phone',
            title: {
                NL: `Uitgifte van "${attributeName}" credential`,
                EN: `Issuance of "${attributeName}" credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier}, Issuer: ${issuerNym?.defProps.identifier}`,
                EN: `Subject: ${subjectNym?.defProps.identifier}, Issuer: ${issuerNym?.defProps.identifier}`,
            },
            long: {
                NL: format(
                    //
                    (s) => `${s.issuer} geeft een ${s.credential} uit aan ${s.subject}`,
                    {
                        issuer: urlActor(issuer!.actor, true),
                        credential: `[#${this.credentialId}]("${attributeName}" credential)`,
                        subject: urlActor(subject!.actor),
                    },
                ),
                EN: format(
                    //
                    (s) => `${s.issuer} issues a ${s.credential} to ${s.subject}`,
                    {
                        issuer: urlActor(issuer!.actor, true),
                        credential: `[#${this.credentialId}]("${attributeName}" credential)`,
                        subject: urlActor(subject!.actor),
                    },
                ),
            },
            locality: Locality.REMOTE,
        };
    }
}

export const IssuanceType = new ActionType(Schema, (id, props) => new Issuance(id, props));
