import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { format } from '../../../util/util';
import { AttributeKnowledge } from '../assets/AttributeKnowledge';
import { AttributeRevocation } from '../assets/AttributeRevocation';
import { Credential } from '../assets/Credential';
import { Pseudonym } from '../assets/Pseudonym';
import { Wallet } from '../assets/Wallet';
import { CommonProps } from '../common/props';
import { urlActor, urlCredential } from '../common/util';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';
import { ValidationResult } from '../validations/ValidationResult';

export const Schema = BaseSchema.extend({
    typeName: 'Presentation',
    title: {
        NL: 'Presentatie van Credential',
        EN: 'Presentation of Credential',
    },
    props: {
        verifier: CommonProps.verifier,
        verifierNym: CommonProps.verifierNym,
        subject: CommonProps.subject,
        subjectNym: CommonProps.subjectNym,
        credential: CommonProps.credential,
        // attributeName: CommonProps.attributeName,
        // attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class Presentation extends Action<Props> {
    schema = Schema;

    protected getSubjectWallet(state: ScenarioState) {
        const { subject } = this.evaluateProps(state);
        return subject!.assets.find((a) => a instanceof Wallet);
    }

    protected getRevocation(credentialId: string, state: ScenarioState) {
        const { subject } = this.evaluateProps(state);
        return subject?.assets
            .filter((a) => a instanceof AttributeRevocation)
            .some((a) => (a as AttributeRevocation).defProps.credential === credentialId);
    }

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        const wallet = this.getSubjectWallet(state);
        if (!wallet) {
            return [
                new ValidationResult(false, {
                    NL: 'Subject heeft een wallet nodig om een credential te kunnen presenteren.',
                    EN: 'Subject needs a wallet to present a credential.',
                }),
            ];
        }

        const revocation = this.getRevocation(this.defProps.credential, state);
        if (revocation) {
            return [
                new ValidationResult(false, {
                    NL: 'Attribuut is ingetrokken, dus kan het niet succesvol worden gepresenteerd.',
                    EN: 'This credential was revoked, so it cannot be presented successfully.',
                }),
            ];
        }

        return [];
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { verifier, credential: attribute } = this.evaluateProps(state);

        if (!attribute) return [];

        const attrProof: Credential = attribute;

        const attr = new AttributeKnowledge(this.id + '1', {
            attributeName: attrProof.defProps.attributeName,
            issuerNym: attrProof.defProps.issuerNym, // TODO FIXME
            subjectNym: this.defProps.subjectNym,
            attributeValue: attrProof.defProps.attributeValue,
        });
        return [new GainAssetOutcome({ actorId: verifier!.actor.id, asset: attr })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);
        const subject = props.subject!.actor;
        const verifier = props.verifier!.actor;

        const subjectNym: Pseudonym | undefined = props.subjectNym;
        const verifierNym: Pseudonym | undefined = props.verifierNym;
        const credential: Credential | undefined = props.credential;

        const base = {
            from: subject,
            to: verifier,
        };

        if (!subjectNym || !verifierNym || !credential) {
            return base;
        }

        return {
            ...base,
            from_nym: subjectNym?.id,
            to_nym: verifierNym?.id,
            to_mode: 'phone',
            title: {
                NL: credential ? `Toon "${credential.defProps.attributeName}" credential` : `Toon  credential`,
                EN: credential ? `Present "${credential.defProps.attributeName}" credential` : `Show  credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier || '?'}, Verifier: ${
                    verifierNym?.defProps.identifier || '?'
                }`,
                EN: `Subject: ${subjectNym?.defProps.identifier || '?'}, Verifier: ${
                    verifierNym?.defProps.identifier || '?'
                }`,
            },
            long: {
                NL: format(
                    //
                    (s) => `${s.subject} toont het ${s.credential} aan ${s.verifier}.`,
                    {
                        subject: urlActor(subject, true),
                        credential: urlCredential(credential),
                        verifier: urlActor(verifier),
                    },
                ),
                EN: format(
                    //
                    (s) => `${s.subject} shows the ${s.credential} to ${s.verifier}.`,
                    {
                        subject: urlActor(subject, true),
                        credential: urlCredential(credential),
                        verifier: urlActor(verifier),
                    },
                ),
            },
            locality: Locality.REMOTE,
        };
    }
}

export const PresentationType = new ActionType(Schema, (id, props) => new Presentation(id, props));
