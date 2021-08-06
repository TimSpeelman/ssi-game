import { lens } from 'lens.ts';
import { mapValues, omit } from '../../../util/util';
import { ContentLibrary } from '../../content/ContentLibrarty';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { ActorDesc } from '../../description/Actor/ActorDesc';
import { assetsToTree } from '../../description/Asset/assetsToTree';
import { AssetTreeNode } from '../../description/Asset/AssetTreeNode';
import { ActorStateDesc } from '../../description/State/ActorStateDesc';
import { ResourceDesc, StateDesc } from '../../description/State/StateDesc';
import { definitionToActor } from '../Actor/definitionToActor';
import { ActorState } from './ActorState';

/** Represents the entire state of the scenario at any point in the scenario. */
export class ScenarioState {
    static defaults: DefaultProps = {
        valid: true,
        isInitial: false,
    };

    static fromConfig(s: ScenarioDef, contentLibrary: ContentLibrary): ScenarioState {
        const actors = s.actors.map(
            (a): ActorState => ({
                actor: definitionToActor(a.definition),
                assets: a.initialAssets.map((a) => contentLibrary.assets.deserialize(a)),
            }),
        );

        const byActor = actors.reduce((obj, a) => ({ ...obj, [a.actor.id]: a }), {});

        return new ScenarioState({ byActor, isInitial: true });
    }

    readonly props: Props;

    constructor(props: Omit<Props, keyof DefaultProps> & Partial<DefaultProps>) {
        this.props = { ...ScenarioState.defaults, ...props };
    }

    describe(): StateDesc {
        const actorStates = mapValues(
            this.props.byActor,
            (byActor): ActorStateDesc => {
                const { trees, record } = assetsToTree(
                    byActor.assets.map((a) => a.describe(this)),
                    byActor.actor.id,
                );
                return {
                    actor: byActor.actor,
                    assetTrees: trees,
                    assetsById: record,
                    mode: byActor.mode,
                };
            },
        );
        const allAssetsById = Object.values(actorStates).reduce(
            (assets, actor) => ({ ...assets, ...actor.assetsById }),
            {} as Record<string, AssetTreeNode>,
        );
        const resources = {
            ...mapValues(this.props.byActor, (actor, id) => ({ type: 'actor' } as ResourceDesc)),
            ...mapValues(allAssetsById, (asset, id) => ({ type: 'asset', ownerId: asset.ownerId } as ResourceDesc)),
        };
        return {
            actors: actorStates,
            assets: allAssetsById,
            valid: this.props.valid,
            resources,
        };
    }

    /** For immutable updating, returns a new state */
    withUpdate(updater: (p: Props) => Props): ScenarioState {
        return new ScenarioState(updater(this.props));
    }

    /** Add an actor, immutable */
    withActor(actor: ActorDesc): ScenarioState {
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
    isInitial: boolean;
    byActor: Record<string, ActorState>;
    valid: boolean;
}

export interface DefaultProps {
    isInitial: boolean;
    valid: boolean;
}
