import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { StringProp } from '../../../model/content/Common/Props/StringProp';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { ComputedStep } from '../../../model/logic/Step/ComputedStep';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { format } from '../../../util/util';
import { GovPassport } from '../assets/GovPassport';
import { CommonProps } from '../common/props';
import { urlActor } from '../common/util';
import { translations } from '../intl/dictionaries';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'PassportIssuance',
    title: {
        NL: 'Uitgifte van paspoort',
        EN: 'Issuance of passport',
    },
    description: {
        NL: 'Met de uitgifte van een paspoort krijgt het Subject de mogelijkheid om zich betrouwbaar te identificeren.',
        EN: 'The issuance of a passport enables the Subject to identify himself reliably.',
    },
    props: {
        issuer: CommonProps.issuer,
        subject: CommonProps.subject,
        identifier: new StringProp({ title: translations.identifier }),
        name: new StringProp({ title: translations.name }),
        firstName: new StringProp({ title: translations.firstName }),
        dateOfBirth: new StringProp({ title: translations.dateOfBirth }),
        placeOfIssuance: new StringProp({ title: translations.placeOfIssuance }),
        placeOfBirth: new StringProp({ title: translations.placeOfBirth }),
        dateOfIssuance: new StringProp({ title: translations.dateOfIssuance }),
        dateOfExpiry: new StringProp({ title: translations.dateOfExpiry }),
        height: new StringProp({ title: translations.height }),
        documentNumber: new StringProp({ title: translations.documentNumber }),
        nationality: new StringProp({ title: translations.nationality }),
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class PassportIssuance extends Action<Props> {
    schema = Schema;

    public get credentialId() {
        return this.id + '-1';
    }

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const { subject } = this.evaluateProps(state);

        const attr = new GovPassport(
            this.credentialId,
            {
                subject: this.defProps.subject,
                identifier: this.defProps.identifier,
                name: this.defProps.name,
                firstName: this.defProps.firstName,
                dateOfBirth: this.defProps.dateOfBirth,
                placeOfIssuance: this.defProps.placeOfIssuance,
                placeOfBirth: this.defProps.placeOfBirth,
                dateOfIssuance: this.defProps.dateOfIssuance,
                dateOfExpiry: this.defProps.dateOfExpiry,
                height: this.defProps.height,
                documentNumber: this.defProps.documentNumber,
                nationality: this.defProps.nationality,
            },
            false,
        );
        return [new GainAssetOutcome({ actorId: subject!.actor.id, asset: attr })];
    }

    _describe(state: ScenarioState, step: ComputedStep): CustomActionDesc {
        const { subject, issuer, ...props } = this.evaluateProps(state);

        return {
            from: issuer!.actor,
            from_mode: 'issuing',
            to: subject!.actor,
            title: {
                NL: `Uitgifte van paspoort`,
                EN: `Issuance of passport`,
            },
            long: {
                NL: format(
                    //
                    (s) => `${s.issuer} geeft een ${s.passport} uit aan ${s.subject}`,
                    {
                        issuer: urlActor(issuer!.actor, true),
                        passport: `[#${this.credentialId}](paspoort)`,
                        subject: urlActor(subject!.actor),
                    },
                ),
                EN: format(
                    //
                    (s) => `${s.issuer} issues a ${s.passport} to ${s.subject}`,
                    {
                        issuer: urlActor(issuer!.actor, true),
                        passport: `[#${this.credentialId}](paspoort)`,
                        subject: urlActor(subject!.actor),
                    },
                ),
            },
            locality: Locality.AT_FROM,
        };
    }
}

export const PassportIssuanceType = new ActionType(Schema, (id, props) => new PassportIssuance(id, props));
