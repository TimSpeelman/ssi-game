import { lens } from 'lens.ts';
import { Asset } from '../../content/assets/Asset';
import { omit } from '../../util/util';
import { ScenarioStateDescription } from '../view/ScenarioStateDescription';
import { Actor } from './Actor';

/** Represents the entire state of the scenario at any point in the scenario. */
export class ScenarioState {
    static deserialize(s: SerializedScenarioState) {
        const props: Props = {
            byActor: s.actors,
        };
        return new ScenarioState(props);
    }

    constructor(readonly props: Props) {}

    describe(): ScenarioStateDescription {
        return {
            actors: this.props.byActor,
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
}

export interface ActorState {
    assets: Asset[];
    actor: Actor;
    mode?: string;
}

export type SerializedScenarioState = {
    actors: Record<string, ActorState>;
};
