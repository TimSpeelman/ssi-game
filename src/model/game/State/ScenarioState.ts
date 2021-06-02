import { lens } from 'lens.ts';
import { omit } from '../../../util/util';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { ScenarioStateDescription } from '../../view/ScenarioStateDescription';
import { Actor } from '../Actor/Actor';
import { definitionToActor } from '../Actor/definitionToActor';
import { ActorState } from './ActorState';

/** Represents the entire state of the scenario at any point in the scenario. */
export class ScenarioState {
    static defaults: DefaultProps = {
        valid: true,
    };

    static fromConfig(s: ScenarioDef): ScenarioState {
        const actors = s.actors.map(
            (a): ActorState => ({
                actor: definitionToActor(a.definition),
                assets: a.initialAssets,
            }),
        );

        const byActor = actors.reduce((obj, a) => ({ ...obj, [a.actor.id]: a }), {});

        return new ScenarioState({ byActor });
    }

    readonly props: Props;

    constructor(props: Omit<Props, keyof DefaultProps> & Partial<DefaultProps>) {
        this.props = { ...ScenarioState.defaults, ...props };
    }

    describe(): ScenarioStateDescription {
        return {
            actors: this.props.byActor,
            valid: this.props.valid,
        };
    }

    /** For immutable updating, returns a new state */
    withUpdate(updater: (p: Props) => Props): ScenarioState {
        return new ScenarioState(updater(this.props));
    }

    /** Add an actor, immutable */
    withActor(actor: Actor): ScenarioState {
        const update = lens<Props>().byActor.k(actor.id).set({ actor, assets: [] });
        return this.withUpdate(update);
    }

    /** Drop an actor, immutable */
    withoutActor(id: string): ScenarioState {
        const update = lens<Props>().byActor.set(omit(id));
        return this.withUpdate(update);
    }
}

export interface Props {
    byActor: Record<string, ActorState>;
    valid: boolean;
}

export interface DefaultProps {
    valid: boolean;
}
