import { AuthenticationResult } from '../../asset/data/abc/AuthenticationResult';
import { GainAssetOutcome } from '../../outcome/GainAssetOutcome';
import { IOutcome } from '../../outcome/IOutcome';
import { ScenarioStateDescription } from '../../scenario/Scenario';
import { IAction } from '../IAction';
import { InteractionDescription } from '../InteractionDescription';

/**
 * A Verifier authenticates a human Subject by comparing its physical appearance with its passport. We assume integrity
 * and authenticity.
 */
export class PhysicalPassportAuthentication implements IAction {
    constructor(
        readonly id: string,
        readonly props: {
            verifierId: string;
            humanSubjectId: string;
            dataSubjectId: string;
        },
    ) {}

    validatePreConditions(state: ScenarioStateDescription): string[] {
        assert(this.props.verifierId in state.actors, 'Unknown human subject id');
        assert(this.props.humanSubjectId in state.actors, 'Unknown verifier id');

        const subject = state.actors[this.props.humanSubjectId];
        const verifier = state.actors[this.props.verifierId];
        const subjectPassport = subject.assets.find((a) => a.type === 'gov-passport');
        assert(!!subjectPassport, 'Subject needs to have passport'); // alternatively: result could be failed authentication

        const humanRecord = verifier.assets.find((a) => a.type === 'human-record' && a.id === this.props.dataSubjectId);
        assert(!!humanRecord, 'Verifier needs to have human record of subject'); // alt: result could be failed authentication

        return []; // TODO
    }

    computeOutcomes(state: ScenarioStateDescription): IOutcome[] {
        const authResult: AuthenticationResult = {
            kind: 'data',
            type: 'authentication-result',
            sourceId: this.props.humanSubjectId,
            targetId: this.props.dataSubjectId,
        };
        return [new GainAssetOutcome({ actorId: this.props.verifierId, asset: authResult })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const subject = state.actors[this.props.humanSubjectId].actor;
        const verifier = state.actors[this.props.verifierId].actor;
        return {
            id: this.id,
            type: 'PhysicalPassportAuthentication',
            from: verifier,
            to: subject,
            description: 'Fysieke authenticatie o.b.v. paspoort',
            sub: '..',
            long: `${ucFirst(verifier.nounPhrase)} authenticeert ${subject.name}, in levende lijve, op basis van ${
                subject.isMale ? 'zijn' : 'haar'
            } paspoort door de pasfoto te vergelijken met ${subject.isMale ? 'zijn' : 'haar'} gezicht.`,
        };
    }
}

function assert(t: boolean, msg: string) {
    if (!t) throw new Error('Assertion Failed: ' + msg);
}

function ucFirst(str: string) {
    return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
}
