import { lens } from 'lens.ts';
import { Translation } from '../../intl/Language';
import { Asset } from '../../model/logic/Asset/Asset';
import { Props, ScenarioState } from '../../model/logic/State/ScenarioState';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { seq, ucFirst } from '../../util/util';

export class TransferAssetOutcome implements IOutcome {
    constructor(
        readonly props: {
            sourceActorId: string;
            targetActorId: string;
            asset: Asset<any>;
        },
    ) {}

    computeState(state: ScenarioState): ScenarioState {
        const L = lens<Props>();

        const change = seq([
            L.byActor
                .k(this.props.sourceActorId)
                .assets.set((assets) => assets.filter((a) => a.id !== this.props.asset.id)),
            L.byActor.k(this.props.targetActorId).assets.set((assets) => [...assets, this.props.asset]),
        ]);

        return new ScenarioState(change(state.props));
    }

    describe(state: ScenarioState): Translation {
        const source = state.props.byActor[this.props.sourceActorId].actor;
        const target = state.props.byActor[this.props.targetActorId].actor;
        return {
            NL: `${ucFirst(source.nounPhrase)} geeft ${this.props.asset.describe(state).title.NL} aan ${
                target.nounPhrase
            }.`,
            EN: `${ucFirst(source.nounPhrase)} passes ${this.props.asset.describe(state).title.EN} to ${
                target.nounPhrase
            }.`,
        };
    }
}
