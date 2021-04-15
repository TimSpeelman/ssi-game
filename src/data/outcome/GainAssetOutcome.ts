import { lens } from 'lens.ts';
import { Asset } from '../asset/Asset';
import { ScenarioStateDescription } from '../scenario/Scenario';
import { IOutcome } from './IOutcome';

export class GainAssetOutcome implements IOutcome {
    constructor(
        readonly props: {
            actorId: string;
            asset: Asset;
        },
    ) {}

    computeState(state: ScenarioStateDescription): ScenarioStateDescription {
        const L = lens<ScenarioStateDescription>();

        const change = L.actors.k(this.props.actorId).assets.set((assets) => [...assets, this.props.asset]);

        return change(state);
    }

    describe(state: ScenarioStateDescription): string {
        const actorName = state.actors[this.props.actorId].actor.name;
        return `Actor ${actorName} krijgt asset van type ${this.props.asset.type}.`;
    }
}
