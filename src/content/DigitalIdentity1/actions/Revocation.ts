import { uniLang } from '../../../intl/Language';
import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { AttributeProof } from '../assets/AttributeProof';
import { AttributeRevocation } from '../assets/AttributeRevocation';
import { Wallet } from '../assets/Wallet';
import { CommonProps } from '../common/props';
import { urlActor, urlCredential } from '../common/util';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'Revocation',
    title: {
        NL: 'Intrekken van credential',
        EN: 'Revocation of credential',
    },
    props: {
        issuer: CommonProps.issuer,
        subject: CommonProps.subject,
        credential: CommonProps.attributeProof,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Revocation extends Action<Props> {
    schema = Schema;

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const subjectWallet = props.subject!.assets.find((a) => a instanceof Wallet);
        const attr = new AttributeRevocation(
            this.id + '1',
            {
                credential: this.defProps.credential,
                issuer: this.defProps.issuer,
                subject: this.defProps.subject,
            },
            false,
            subjectWallet?.id,
        );
        return [new GainAssetOutcome({ actorId: this.defProps.subject, asset: attr })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject!.actor;
        const issuer = props.issuer!.actor;
        const credential: AttributeProof | undefined = props.credential;

        return {
            from: issuer,
            to: subject,
            description: credential
                ? {
                      NL: `Revocatie van ${credential.defProps.attributeName} credential`,
                      EN: `Revocation of ${credential.defProps.attributeName} credential`,
                  }
                : {
                      NL: 'Revocatie van credential',
                      EN: 'Revocation of credential',
                  },
            sub: {
                NL: '',
                EN: '',
            },
            long: !credential
                ? uniLang('')
                : {
                      NL: `${urlActor(issuer, true)} trekt het ${urlCredential(credential)} van ${urlActor(
                          subject,
                      )} in.`,
                      EN: `${urlActor(issuer, true)} revokes the ${urlCredential(credential)} of ${urlActor(subject)}.`,
                  },
            locality: Locality.REMOTE,
        };
    }
}

export const RevocationType = new ActionType(Schema, (id, props) => new Revocation(id, props));
