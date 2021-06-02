import { lens } from 'lens.ts';
import { Asset } from '../../model/logic/Asset/Asset';
import { Props, ScenarioState } from '../../model/logic/State/ScenarioState';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { ucFirst } from '../../util/util';

export class GainAssetOutcome implements IOutcome {
    constructor(
        readonly props: {
            actorId: string;
            asset: Asset;
        },
    ) {}

    computeState(state: ScenarioState): ScenarioState {
        const L = lens<Props>();

        const change = L.byActor.k(this.props.actorId).assets.set((assets) => [...assets, this.props.asset]);

        return new ScenarioState(change(state.props));
    }

    describe(state: ScenarioState): string {
        const actor = state.props.byActor[this.props.actorId].actor;
        return `${ucFirst(actor.nounPhrase)} krijgt ${this.props.asset.describe(state).title}.`;
    }
}
