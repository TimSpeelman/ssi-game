import { lens } from 'lens.ts';
import { OutcomeDesc } from '../../../model/description/Step/OutcomeDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { Props, ScenarioState } from '../../../model/logic/State/ScenarioState';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { format, seq } from '../../../util/util';
import { urlActor } from '../common/util';

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

    describe(state: ScenarioState): OutcomeDesc {
        const source = state.props.byActor[this.props.sourceActorId].actor;
        const target = state.props.byActor[this.props.targetActorId].actor;
        const asset = this.props.asset;
        const assetTitle = asset.describe(state).title;

        return {
            usesAssetIds: [asset.id],
            description: {
                NL: format((s) => `${s.source} geeft ${s.asset} aan ${s.target}.`, {
                    source: urlActor(source, true),
                    asset: `[#${asset.id}](${assetTitle.NL})`,
                    target: urlActor(target, true),
                }),

                EN: format((s) => `${s.source} gives ${s.asset} to ${s.target}.`, {
                    source: urlActor(source, true),
                    asset: `[#${asset.id}](${assetTitle.EN})`,
                    target: urlActor(target, true),
                }),
            },
        };
    }
}
