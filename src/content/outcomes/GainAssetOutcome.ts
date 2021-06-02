import { lens } from 'lens.ts';
import { IOutcome } from '../../model/game/Action/IOutcome';
import { Props, ScenarioState } from '../../model/game/State/ScenarioState';
import { ucFirst } from '../../util/util';
import { Asset } from '../assets/Asset';

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
        return `${ucFirst(actor.nounPhrase)} krijgt ${assetToString(this.props.asset)}.`;
    }
}

function assetToString(a: Asset) {
    const keys = Object.keys(a);
    return `<${ucFirst(a.type)} ${keys
        .filter((k) => k !== 'kind' && k !== 'type' && k !== 'id')
        // @ts-ignore
        .map((k) => `${k}:${a[k]}`)
        .join(' | ')}>`;
}
