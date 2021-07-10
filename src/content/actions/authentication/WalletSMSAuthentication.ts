import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AttributeKnowledge } from '../../assets/data/abc/AttributeKnowledge';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'WalletSMSAuthentication',
    title: {
        [Language.NL]: 'Authenticatie van Wallet via SMS',
        [Language.EN]: 'Authenticatie of Wallet via SMS',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        identifier: CommonProps.identifier,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class WalletSMSAuthentication extends Action<Props> {
    schema = Schema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const authResult = new AuthenticationResult(this.id + '1', {
            subject: this.defProps.subject,
            identifier: this.defProps.identifier,
        });
        const phoneNumber = new AttributeKnowledge(this.id + '2', {
            subject: this.defProps.subject,
            attributeName: 'telefoonnummer',
            attributeValue: '06123456789',
            issuer: '',
        });
        return [
            new GainAssetOutcome({ actorId: this.defProps.verifier, asset: authResult }),
            new GainAssetOutcome({ actorId: this.defProps.verifier, asset: phoneNumber }),
        ];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.defProps.subject].actor;
        const verifier = state.props.byActor[this.defProps.verifier].actor;
        return {
            id: this.id,
            type: this.schema.typeName,
            from: verifier,
            to: subject,
            description: {
                [Language.NL]: 'Authenticatie van wallet (pseudoniem) via SMS',
                [Language.EN]: 'Authentication of wallet (pseudonym) via SMS',
            },
            sub: {
                [Language.NL]: '',
                [Language.EN]: '',
            },
            long: {
                [Language.NL]: `${ucFirst(verifier.nounPhrase)} authenticeert de wallet van ${
                    subject.nounPhrase
                } door ${subject.isMale ? 'hem' : 'haar'} een unieke code per SMS te sturen.`,

                [Language.EN]: `${ucFirst(verifier.nounPhrase)} authenticates the wallet of ${
                    subject.nounPhrase
                } by sending ${subject.isMale ? 'him' : 'her'} a unique code via SMS.`,
            },
            locality: Locality.AT_FROM, // TODO not neccesarily (but in municipality onboarding, yes)
        };
    }
}

export const WalletSMSAuthenticationType = new ActionType(
    Schema,
    (id, props) => new WalletSMSAuthentication(id, props),
);
