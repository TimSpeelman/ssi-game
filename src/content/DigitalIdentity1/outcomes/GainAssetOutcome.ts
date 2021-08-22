import { lens } from 'lens.ts';
import { OutcomeDesc } from '../../../model/description/Step/OutcomeDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { Props, ScenarioState } from '../../../model/logic/State/ScenarioState';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { ucFirst } from '../../../util/util';

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

    describe(state: ScenarioState): OutcomeDesc {
        const actor = state.props.byActor[this.props.actorId].actor;
        const asset = this.props.asset.describe(state);
        return {
            description: {
                NL: `[#${actor.id}](${ucFirst(actor.nounPhrase)}) krijgt [#${asset.id}](${asset.title.NL}).`,
                EN: `[#${actor.id}](${ucFirst(actor.nounPhrase)}) receives [#${asset.id}](${asset.title.EN}).`,
            },
            usesAssetIds: [this.props.asset.id],
        };
    }
}
