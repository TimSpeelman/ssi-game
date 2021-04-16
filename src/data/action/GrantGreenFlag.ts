import { ucFirst } from '../../util/util';
import { GreenFlag } from '../asset/Flag';
import { GainAssetOutcome } from '../outcome/GainAssetOutcome';
import { IOutcome } from '../outcome/IOutcome';
import { ScenarioStateDescription } from '../scenario/Scenario';
import { IAction } from './IAction';
import { InteractionDescription } from './InteractionDescription';

export class GrantGreenFlag implements IAction {
    constructor(
        readonly id: string,
        readonly props: {
            fromId: string;
            toId: string;
            description: string;
        },
    ) {}

    validatePreConditions(): string[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        const flag: GreenFlag = {
            description: this.props.description,
            kind: 'flag',
            type: 'green-flag',
            success: true,
        };
        return [new GainAssetOutcome({ actorId: this.props.toId, asset: flag })];
    }

    describe(state: ScenarioStateDescription): InteractionDescription {
        const from = state.actors[this.props.fromId].actor;
        const to = state.actors[this.props.toId].actor;
        const desc = this.props.description;
        return {
            id: this.id,
            type: 'GreenFlag',
            description: `${ucFirst(from.nounPhrase)} geeft ${to.name} de groene vlag`,
            sub: desc,
            from: from,
            to: to,
            long: `${ucFirst(from.nounPhrase)} geeft ${to.name} de groene vlag.`,
        };
    }
}
