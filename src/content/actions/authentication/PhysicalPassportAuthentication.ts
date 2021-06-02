import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../../model/logic/Step/IValidationResult';
import { ActionFormConfig } from '../../../model/view/ActionFormConfig';
import { AuthenticationResult } from '../../assets/data/abc/AuthenticationResult';
import { GainAssetOutcome } from '../../outcomes/GainAssetOutcome';

export interface Props {
    verifierId: string;
    humanSubjectId: string;
    dataSubjectId: string;
}

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class PhysicalPassportAuthentication extends Action<Props> {
    typeName = 'PhysicalPassportAuthentication';

    static config: ActionFormConfig<keyof Props> = {
        title: 'Authenticatie o.b.v. paspoort',
        fields: {
            verifierId: { type: 'actor', title: 'Verifier' },
            humanSubjectId: { type: 'actor', title: 'Subject' },
            dataSubjectId: { type: 'string', title: 'Pseudoniem van Subject' },
        },
    };

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
        const authResult = new AuthenticationResult(this.id + '1', {
            sourceId: this.props.humanSubjectId,
            targetId: this.props.dataSubjectId,
        });
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: authResult })];
    }

    describe(state: ScenarioState): ActionDesc {
        const subject = state.props.byActor[this.props.humanSubjectId].actor;
        const verifier = state.props.byActor[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'PhysicalPassportAuthentication',
            from: verifier,
            to: subject,
            to_mode: 'facescan',
            description: 'Fysieke authenticatie o.b.v. paspoort',
            sub: '..',
            long: `${ucFirst(verifier.nounPhrase)} authenticeert ${subject.name}, in levende lijve, op basis van ${
                subject.isMale ? 'zijn' : 'haar'
            } paspoort door de pasfoto te vergelijken met ${subject.isMale ? 'zijn' : 'haar'} gezicht.`,
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
