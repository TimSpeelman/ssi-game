import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { format } from '../../../util/util';
import { AuthenticationResult } from '../assets/AuthenticationResult';
import { GovPassport } from '../assets/GovPassport';
import { CommonProps } from '../common/props';
import { urlActor } from '../common/util';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'PhysicalPassportAuthentication',
    title: {
        NL: 'Authenticatie o.b.v. paspoort',
        EN: 'Authentication based on paspoort',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        subjectPassport: CommonProps.subjectPassport,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class PhysicalPassportAuthentication extends Action<Props> {
    schema = Schema;

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        if (!props.subjectPassport) return [];

        const passport: GovPassport = props.subjectPassport;

        const authResult = new AuthenticationResult(this.id + '1', {
            subject: this.defProps.subject,
            identifier: passport.defProps.identifier,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.verifier, asset: authResult })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const props = this.evaluateProps(state);

        const subject = props.subject!.actor;
        const verifier = props.verifier!.actor;
        return {
            from: verifier,
            to: subject,
            to_mode: 'facescan',
            title: {
                NL: 'Fysieke authenticatie o.b.v. paspoort',
                EN: 'Physical authentication based on paspoort',
            },
            sub: {
                NL: '',
                EN: '',
            },
            long: {
                NL: format(
                    //
                    (s) =>
                        `${s.verifier} authenticeert ${s.subject}, in levende lijve,` +
                        ` op basis van ${s.hisHer} paspoort door de pasfoto te vergelijken` +
                        ` met ${s.hisHer} gezicht.`,
                    {
                        verifier: urlActor(verifier, true),
                        subject: urlActor(subject),
                        hisHer: subject.isMale ? 'zijn' : 'haar',
                    },
                ),

                EN: format(
                    //
                    (s) =>
                        `${s.verifier} authenticates ${s.subject}, in real life,` +
                        ` based on ${s.hisHer} passport by comparing the photo on it` +
                        ` with ${s.hisHer} face.`,
                    {
                        verifier: urlActor(verifier, true),
                        subject: urlActor(subject),
                        hisHer: subject.isMale ? 'zijn' : 'haar',
                    },
                ),
            },
            locality: Locality.AT_FROM,
        };
    }
}

export const PhysicalPassportAuthenticationType = new ActionType(
    Schema,
    (id, props) => new PhysicalPassportAuthentication(id, props),
);
