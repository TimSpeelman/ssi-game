import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActorProp } from '../../../model/content/Common/Prop/ActorProp';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { AttributeRevocation } from '../../assets/data/abc/AttributeRevocation';
import { Wallet } from '../../assets/software/Wallet';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const RevocationSchema = new ActionSchema({
    typeName: 'Revocation',
    title: {
        [Language.NL]: 'Intrekken van credential',
        [Language.EN]: 'Revocation of credential',
    },
    props: {
        issuer: new ActorProp('issuer', { title: translations.issuer }),
        subject: new ActorProp('subject', { title: translations.subject }),
        attributeName: new StringProp('attributeName', { title: translations.attributeName }),
    },
});

export type Props = TypeOfSchema<typeof RevocationSchema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Revocation extends Action<Props> {
    typeName = 'Revocation';

    schema = RevocationSchema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const subjectWallet = props.subject.assets.find((a) => a instanceof Wallet);
        const attr = new AttributeRevocation(this.id + '1', {
            parentId: subjectWallet?.id,
            attributeId: this.defProps.attributeName,
            issuerId: this.defProps.issuer,
            subjectId: this.defProps.subject,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.subject, asset: attr })];
    }

    describe(state: ScenarioState): ActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject.actor;
        const issuer = props.issuer.actor;
        return {
            id: this.id,
            type: this.typeName,
            from: issuer,
            to: subject,
            description: {
                [Language.NL]: `Revocatie van ${this.defProps.attributeName} credential`,
                [Language.EN]: `Revocation of ${this.defProps.attributeName} credential`,
            },
            sub: {
                [Language.NL]: '',
                [Language.EN]: '',
            },
            long: {
                [Language.NL]: `${ucFirst(issuer.nounPhrase)} trekt het attribuut ${this.defProps.attributeName} van ${
                    subject.nounPhrase
                } in.`,
                [Language.EN]: `${ucFirst(issuer.nounPhrase)} revokes the attribute ${this.defProps.attributeName} of ${
                    subject.nounPhrase
                }.`,
            },
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
export const RevocationType = new ActionType(RevocationSchema, (id, props) => new Revocation(id, props));
