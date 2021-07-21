import { translations } from '../../intl/dictionaries';
import { TypeOfActionSchema } from '../../model/content/Action/ActionSchema';
import { ActionType } from '../../model/content/Action/ActionType';
import { ActorProp } from '../../model/content/Common/Prop/ActorProp';
import { AssetProp } from '../../model/content/Common/Prop/AssetProp';
import { Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';
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

    validatePreConditions(): IValidationResult[] {
        return [];
    }

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
        const props = this.evaluateProps(state);

        return {
            from: state.props.byActor[this.defProps.from].actor,
            to: state.props.byActor[this.defProps.to].actor,
            description: {
                NL: 'Overdracht van ' + props.asset?.describe(state).title.NL,
                EN: 'Handover of ' + props.asset?.describe(state).title.EN,
            },
            sub: props.asset?.describe(state).title || { NL: '', EN: '' },
            locality: Locality.REMOTE,
        };
    }
}
export const HandoverType = new ActionType(Schema, (id, props) => new Handover(id, props));
