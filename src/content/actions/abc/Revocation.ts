import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AttributeRevocation } from '../../assets/data/abc/AttributeRevocation';
import { Wallet } from '../../assets/software/Wallet';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'Revocation',
    title: {
        [Language.NL]: 'Intrekken van credential',
        [Language.EN]: 'Revocation of credential',
    },
    props: {
        issuer: CommonProps.issuer,
        subject: CommonProps.subject,
        attributeName: CommonProps.attributeName,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Revocation extends Action<Props> {
    schema = Schema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const subjectWallet = props.subject.assets.find((a) => a instanceof Wallet);
        const attr = new AttributeRevocation(this.id + '1', {
            // @ts-ignore TODO FIXME
            parentId: subjectWallet?.id,
            attributeName: this.defProps.attributeName,
            issuer: this.defProps.issuer,
            subject: this.defProps.subject,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.subject, asset: attr })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject.actor;
        const issuer = props.issuer.actor;
        return {
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

export const RevocationType = new ActionType(Schema, (id, props) => new Revocation(id, props));