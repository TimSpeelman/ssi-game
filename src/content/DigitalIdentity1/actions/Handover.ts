import { translations } from '../../../intl/dictionaries';
import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActorProp } from '../../../model/content/Common/Prop/ActorProp';
import { AssetProp } from '../../../model/content/Common/Prop/AssetProp';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { format } from '../../../util/util';
import { urlActor } from '../common/util';
import { TransferAssetOutcome } from '../outcomes/TransferAssetOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'Handover',
    title: {
        NL: 'Asset overdragen',
        EN: 'Handover asset',
    },
    props: {
        from: new ActorProp({ title: translations.fromActor }),
        to: new ActorProp({ title: translations.toActor }),
        asset: new AssetProp({
            title: { EN: 'Asset', NL: 'Asset' },
            dependsOn: ['from'],
            filter: (a, d) => a.ownerId === d.from && a.asset.transferrable,
        }),
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A custom interaction between two Actors
 */
export class Handover extends Action<Props> {
    schema = Schema;

    computeOutcomes(state: ScenarioState): IOutcome[] {
        const props = this.evaluateProps(state);

        if (!props.asset) return [];

        return [
            new TransferAssetOutcome({
                sourceActorId: this.defProps.from,
                targetActorId: this.defProps.to,
                asset: props.asset,
            }),
        ];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const { from, to, asset } = this.evaluateProps(state);

        const base = {
            from: from!.actor,
            to: to!.actor,
        };

        if (!from || !to || !asset) {
            return base;
        }

        const assetTitle = asset.describe(state).title;

        return {
            ...base,
            title: {
                NL: 'Overdracht van ' + assetTitle.NL,
                EN: 'Handover of ' + assetTitle.EN,
            },
            long: {
                NL: format(
                    //
                    (s) => `${s.from} geeft ${s.to} ${s.asset}`,
                    {
                        from: urlActor(from.actor, true),
                        to: urlActor(to.actor),
                        asset: `[#${asset.id}](${assetTitle.NL})`,
                    },
                ),
                EN: format(
                    //
                    (s) => `${s.from} gives ${s.to} ${s.asset}`,
                    {
                        from: urlActor(from.actor, true),
                        to: urlActor(to.actor),
                        asset: `[#${asset.id}](${assetTitle.EN})`,
                    },
                ),
            },
            sub: asset.describe(state).title || { NL: '', EN: '' },
        };
    }
}
export const HandoverType = new ActionType(Schema, (id, props) => new Handover(id, props));
