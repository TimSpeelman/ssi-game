import { Actor } from '../actor/Actor';
import { IOutcome } from '../outcome/IOutcome';
import { IAction } from './IAction';
import { InteractionDescription } from './InteractionDescription';

/**
 * A custom interaction between two Actors
 */
export class CustomInteraction implements IAction {
    constructor(
        readonly id: string,
        readonly props: {
            from: Actor;
            to: Actor;
            description: string;
            sub: string;
        },
    ) {}

    validatePreConditions(): string[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        return [];
    }

    describe(): InteractionDescription {
        return {
            id: this.id,
            type: 'CustomInteraction',
            ...this.props,
        };
    }
}
