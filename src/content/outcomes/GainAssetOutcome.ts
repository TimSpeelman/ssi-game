import { lens } from 'lens.ts';
import { IOutcome } from '../../model/game/IOutcome';
import { ScenarioStateDescription } from '../../model/view/ScenarioStateDescription';
import { ucFirst } from '../../util/util';
import { Asset } from '../assets/Asset';

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
        const actor = state.actors[this.props.actorId].actor;
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