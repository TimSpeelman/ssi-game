import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, CustomActionDesc } from '../../../model/logic/Step/Action';
import { ComputedStep } from '../../../model/logic/Step/ComputedStep';
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

    protected get credentialId() {
        return this.id + '-1';
    }

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

        const subjectWallet = subject!.assets.find((a) => a instanceof Wallet);
        const attr = new AttributeProof(this.credentialId, {
            // @ts-ignore TODO FIXME
            parentId: subjectWallet?.id,
            attributeName: this.defProps.attributeName,
            attributeValue: this.defProps.attributeValue,
            issuer: this.defProps.issuer,
            subject: this.defProps.subject,
            issuerNym: this.defProps.issuerNym,
            subjectNym: this.defProps.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: subject!.actor.id, asset: attr })];
    }

    _describe(state: ScenarioState, step: ComputedStep): CustomActionDesc {
        const { subject, issuer, ...props } = this.evaluateProps(state);

        const { preState } = step;

        // const subject = state.props.byActor[this.props.subjectId].actor;
        // const issuer = state.props.byActor[this.props.issuerId].actor;
        const subjectNym: Pseudonym | undefined = props.subjectNym;
        const issuerNym: Pseudonym | undefined = props.issuerNym;

        const issuerId = issuer!.actor.id;
        const issuerName = ucFirst(issuer!.actor.nounPhrase);
        const attrName = this.defProps.attributeName;
        const subjectId = subject!.actor.id;
        const subjectName = subject!.actor.nounPhrase;
        return {
            from: issuer!.actor,
            from_mode: 'issuing',
            from_nym: issuerNym?.defProps.image,
            to: subject!.actor,
            to_nym: subjectNym?.defProps.image,
            to_mode: 'phone',
            description: {
                NL: `Uitgave van "${this.defProps.attributeName}" credential`,
                EN: `Issuance of "${this.defProps.attributeName}" credential`,
            },
            sub: {
                NL: `Subject: ${subjectNym?.defProps.identifier}, Issuer: ${issuerNym?.defProps.identifier}`,
                EN: `Subject: ${subjectNym?.defProps.identifier}, Issuer: ${issuerNym?.defProps.identifier}`,
            },
            long: {
                NL: `[#${issuerId}](${issuerName}) geeft een [#${this.credentialId}]("${attrName}" credential) uit aan [#${subjectId}](${subjectName}).`,
                EN: `[#${issuerId}](${issuerName}) issues a [#${this.credentialId}]("${attrName}" credential) to [#${subjectId}](${subjectName}).`,
            },
            locality: Locality.REMOTE,
        };
    }
}

export const IssuanceType = new ActionType(Schema, (id, props) => new Issuance(id, props));
