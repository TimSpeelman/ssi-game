import { translations } from '../../../intl/dictionaries';
import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActorProp } from '../../../model/content/Common/Prop/ActorProp';
import { AssetProp } from '../../../model/content/Common/Prop/AssetProp';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { AttributeProof } from '../../assets/data/abc/AttributeProof';
import { Wallet } from '../../assets/software/Wallet';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const IssuanceSchema = new ActionSchema({
    typeName: 'Issuance',
    title: {
        [Language.NL]: 'Uitgifte van credenptial',
        [Language.EN]: 'Issuance of credential',
    },
    props: {
        issuer: new ActorProp('issuer', { title: translations.issuer }),
        issuerNym: new AssetProp('issuerNym', {
            title: translations.issuerPseudonym,
            dependsOn: ['issuer'],
            filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.issuer, // TODO ownerID
            autoFill: true,
        }),

        subject: new ActorProp('subject', { title: translations.subject }),
        subjectNym: new AssetProp('subjectNym', {
            title: translations.subjectPseudonym,
            dependsOn: ['subject'],
            filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.subject, // TODO ownerID
            autoFill: true,
        }),

        attributeName: new StringProp('attributeName', { title: translations.attributeName }),
        attributeValue: new StringProp('attributeValue', { title: translations.attributeValue }),
    },
});

export type Props = TypeOfSchema<typeof IssuanceSchema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class Issuance extends Action<Props> {
    typeName = 'Issuance';

    schema = IssuanceSchema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        // props = {
        //     issuer: typeBuilder.actor({ title: 'Uitgever' }),
        //     issuerNym: typeBuilder.assetOfActor('issuer', { type: 'Pseudonym', autoFill: true }),
        //     subjectNym: typeBuilder.assetOfActor('subject', { type: 'Pseudonym', autoFill: true }),
        // }
        // derived = {
        //     wallet: s => s.getAssetOfActor(p.subjectId, a => a instanceof Wallet),
        //     issuerNym: s => s.getAssetOfActor(p.subjectId, a => a instanceof Wallet),
        // }
        // validator
        // .requireActorHasAsset(p.subjectId, a => )
        // .requireActorHasAsset(p.subjectId, a => a instanceof Wallet)

        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { subject } = this.evaluateProps(state);

        const subjectWallet = subject.assets.find((a) => a instanceof Wallet);
        const attr = new AttributeProof(this.id + '1', {
            parentId: subjectWallet?.id,
            name: this.defProps.attributeName,
            value: this.defProps.attributeValue,
            issuerId: this.defProps.issuerNym,
            subjectId: this.defProps.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: subject.actor.id, asset: attr })];
    }

    describe(state: ScenarioState): ActionDesc {
        const { subject, issuer, ...props } = this.evaluateProps(state);

        // const subject = state.props.byActor[this.props.subjectId].actor;
        // const issuer = state.props.byActor[this.props.issuerId].actor;
        return {
            id: this.id,
            type: this.typeName,
            from: issuer.actor,
            from_mode: 'issuing',
            to: subject.actor,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Uitgave van ${this.defProps.attributeName} credential`,
                [Language.EN]: `Issuance of ${this.defProps.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.defProps.subjectNym}, Issuer: ${this.defProps.issuerNym}`,
                [Language.EN]: `Subject: ${this.defProps.subjectNym}, Issuer: ${this.defProps.issuerNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(issuer.actor.nounPhrase)} geeft een ${
                    this.defProps.attributeName
                } credential uit aan ${subject.actor.nounPhrase}.`,
                [Language.EN]: `${ucFirst(issuer.actor.nounPhrase)} issues a ${
                    this.defProps.attributeName
                } credential to ${subject.actor.nounPhrase}.`,
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

export const IssuanceType = new ActionType(IssuanceSchema, (id, props) => new Issuance(id, props));
