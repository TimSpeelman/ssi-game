import { TypeOfActionSchema } from '../../model/content/Action/ActionSchema';
import { ActionType } from '../../model/content/Action/ActionType';
import { Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';
import { ucFirst } from '../../util/util';
import { AuthenticationResult } from '../assets/AuthenticationResult';
import { GovPassport } from '../assets/GovPassport';
import { CommonProps } from '../common/props';
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

    validatePreConditions(state: ScenarioState): IValidationResult[] {
        const results: IValidationResult[] = [];

        // const subject = state.props.byActor[this.props.humanSubjectId];
        // const verifier = state.props.byActor[this.props.verifierId];
        // const subjectPassport = subject.assets.find((a) => a.type === 'gov-passport');
        // if (!subjectPassport)
        //     results.push(new ValidationResult(false, `${ucFirst(subject.actor.nounPhrase)} heeft geen paspoort.`));

        // const humanRecord = verifier.assets.find((a) => a.type === 'human-record' && a.id === this.props.dataSubjectId);
        // if (!humanRecord)
        //     results.push(
        //         new ValidationResult(
        //             false,
        //             `${ucFirst(verifier.actor.nounPhrase)} heeft geen record van ${subject.actor.name}.`,
        //         ),
        //     );

        return results;
    }

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
            description: {
                NL: 'Fysieke authenticatie o.b.v. paspoort',
                EN: 'Physical authentication based on paspoort',
            },
            sub: {
                NL: '',
                EN: '',
            },
            long: {
                NL: `${ucFirst(verifier.nounPhrase)} authenticeert ${
                    subject.nounPhrase
                }, in levende lijve, op basis van ${
                    subject.isMale ? 'zijn' : 'haar'
                } paspoort door de pasfoto te vergelijken met ${subject.isMale ? 'zijn' : 'haar'} gezicht.`,

                EN: `${ucFirst(verifier.nounPhrase)} authenticates ${subject.nounPhrase}, in real life, based on ${
                    subject.isMale ? 'his' : 'her'
                } passport by comparing the photo on it with  ${subject.isMale ? 'his' : 'her'} face.`,
            },
            locality: Locality.AT_FROM,
        };
    }
}

export const PhysicalPassportAuthenticationType = new ActionType(
    Schema,
    (id, props) => new PhysicalPassportAuthentication(id, props),
);
