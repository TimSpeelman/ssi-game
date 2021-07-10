import { Language } from '../../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { CommonProps } from '../../common/props';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'PhysicalPassportAuthentication',
    title: {
        [Language.NL]: 'Authenticatie o.b.v. paspoort',
        [Language.EN]: 'Authentication based on paspoort',
    },
    props: {
        verifier: CommonProps.verifier,
        subject: CommonProps.subject,
        identifier: CommonProps.identifier,
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class PhysicalPassportAuthentication extends Action<Props> {
    typeName = 'PhysicalPassportAuthentication';

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

        const authResult = new AuthenticationResult(this.id + '1', {
            subject: this.defProps.subject,
            identifier: this.defProps.identifier,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.verifier, asset: authResult })];
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
            to_mode: 'facescan',
            description: {
                [Language.NL]: 'Fysieke authenticatie o.b.v. paspoort',
                [Language.EN]: 'Physical authentication based on paspoort',
            },
            sub: {
                [Language.NL]: '',
                [Language.EN]: '',
            },
            long: {
                [Language.NL]: `${ucFirst(verifier.nounPhrase)} authenticeert ${
                    subject.nounPhrase
                }, in levende lijve, op basis van ${
                    subject.isMale ? 'zijn' : 'haar'
                } paspoort door de pasfoto te vergelijken met ${subject.isMale ? 'zijn' : 'haar'} gezicht.`,

                [Language.EN]: `${ucFirst(verifier.nounPhrase)} authenticates ${
                    subject.nounPhrase
                }, in real life, based on ${
                    subject.isMale ? 'his' : 'her'
                } passport by comparing the photo on it with  ${subject.isMale ? 'his' : 'her'} face.`,
            },
            locality: Locality.AT_FROM,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
export const PhysicalPassportAuthenticationType = new ActionType(
    Schema,
    (id, props) => new PhysicalPassportAuthentication(id, props),
);
