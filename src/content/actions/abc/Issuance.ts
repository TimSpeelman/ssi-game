import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../../util/util';
import { AttributeProof } from '../../assets/data/abc/AttributeProof';
import { Pseudonym } from '../../assets/data/abc/Pseudonym';
import { Wallet } from '../../assets/software/Wallet';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'Issuance',
    title: {
        NL: 'Uitgifte van credential',
        EN: 'Issuance of credential',
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
            // @ts-ignore TODO FIXME
            parentId: subjectWallet?.id,
            attributeName: this.defProps.attributeName,
            attributeValue: this.defProps.attributeValue,
            issuer: this.defProps.issuer,
            subject: this.defProps.subject,
        });
        return [new GainAssetOutcome({ actorId: subject.actor.id, asset: attr })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const { subject, issuer, ...props } = this.evaluateProps(state);

        console.log(props, this.defProps);

        // const subject = state.props.byActor[this.props.subjectId].actor;
        // const issuer = state.props.byActor[this.props.issuerId].actor;
        const subjectNym: Pseudonym = props.subjectNym;
        const issuerNym: Pseudonym = props.issuerNym;

        return {
            from: issuer.actor,
            from_mode: 'issuing',
            from_nym: issuerNym.defProps.image,
            to: subject.actor,
            to_nym: subjectNym.defProps.image,
            to_mode: 'phone',
            description: {
                NL: `Uitgave van "${this.defProps.attributeName}" credential`,
                EN: `Issuance of "${this.defProps.attributeName}" credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym.defProps.identifier}, Issuer: ${issuerNym.defProps.identifier}`,
                EN: `Subject: ${subjectNym.defProps.identifier}, Issuer: ${issuerNym.defProps.identifier}`,
            },
            long: {
                NL: `${ucFirst(issuer.actor.nounPhrase)} geeft een "${
                    this.defProps.attributeName
                }" credential uit aan ${subject.actor.nounPhrase}.`,
                EN: `${ucFirst(issuer.actor.nounPhrase)} issues a "${this.defProps.attributeName}" credential to ${
                    subject.actor.nounPhrase
                }.`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const IssuanceType = new ActionType(Schema, (id, props) => new Issuance(id, props));
