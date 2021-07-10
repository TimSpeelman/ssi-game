import { lens } from 'lens.ts';
import { Translation } from '../../intl/Language';
import { Asset } from '../../model/logic/Asset/Asset';
import { Props, ScenarioState } from '../../model/logic/State/ScenarioState';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { ucFirst } from '../../util/util';

export class GainAssetOutcome implements IOutcome {
    constructor(
        readonly props: {
            actorId: string;
            asset: Asset<any>;
        },
    ) {}

    computeState(state: ScenarioState): ScenarioState {
        const L = lens<Props>();

        const change = L.byActor.k(this.props.actorId).assets.set((assets) => [...assets, this.props.asset]);

        return new ScenarioState(change(state.props));
    }

    describe(state: ScenarioState): Translation {
        const actor = state.props.byActor[this.props.actorId].actor;
        return {
            NL: `${ucFirst(actor.nounPhrase)} krijgt ${this.props.asset.describe(state).title.NL}.`,
            EN: `${ucFirst(actor.nounPhrase)} receives ${this.props.asset.describe(state).title.EN}.`,
        };
    }
}
