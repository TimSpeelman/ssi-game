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
import { AttributeRequest } from '../../assets/data/abc/AttributeRequest';
import { Wallet } from '../../assets/software/Wallet';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const PresentationRequestSchema = new ActionSchema({
    typeName: 'PresentationRequest',
    title: {
        [Language.NL]: 'Verzoek voor Presentatie',
        [Language.EN]: 'Request for Presentation',
    },
    props: {
        verifier: new ActorProp('verifier', { title: translations.verifier }),
        subject: new ActorProp('subject', { title: translations.subject }),
        verifierNym: new AssetProp('verifierNym', {
            title: translations.verifierPseudonym,
            dependsOn: ['verifier'],
            filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.verifier, // TODO ownerID
            autoFill: true,
        }),
        subjectNym: new AssetProp('subjectNym', {
            title: translations.subjectPseudonym,
            dependsOn: ['subject'],
            filter: (a, data) => a.asset.type === 'Wallet' && a.ownerId === data.subject, // TODO ownerID
            autoFill: true,
        }),
        attributeName: new StringProp('attributeName', { title: translations.attributeName }),
    },
});

export type Props = TypeOfSchema<typeof PresentationRequestSchema>;

export class PresentationRequest extends Action<Props> {
    typeName = 'PresentationRequest';

    schema = PresentationRequestSchema;

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        return []; // TODO
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        const subjectWallet = props.subject.assets.find((a) => a instanceof Wallet);
        const req = new AttributeRequest(this.id + '1', {
            parentId: subjectWallet?.id,
            name: this.defProps.attributeName,
            verifierId: this.defProps.verifier,
            subjectId: this.defProps.subjectNym,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.subject, asset: req })];
    }

    describe(state: ScenarioState): ActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject.actor;
        const verifier = props.verifier.actor;
        return {
            id: this.id,
            type: this.typeName,
            from: verifier,
            to: subject,
            to_mode: 'phone',
            description: {
                [Language.NL]: `Vraag om ${this.defProps.attributeName} credential te tonen`,
                [Language.EN]: `Request for presentation of ${this.defProps.attributeName} credential`,
            },
            sub: {
                [Language.NL]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
                [Language.EN]: `Subject: ${this.defProps.subjectNym}, Verifier: ${this.defProps.verifierNym}`,
            },
            long: {
                [Language.NL]: `${ucFirst(verifier.nounPhrase)} verzoekt ${subject.nounPhrase} om het attribuut ${
                    this.defProps.attributeName
                } te presenteren.`,
                [Language.EN]: `${ucFirst(verifier.nounPhrase)} requests ${
                    subject.nounPhrase
                } for a presentation of the ${this.defProps.attributeName} credential.`,
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
export const PresentationRequestType = new ActionType(
    PresentationRequestSchema,
    (id, props) => new PresentationRequest(id, props),
);
