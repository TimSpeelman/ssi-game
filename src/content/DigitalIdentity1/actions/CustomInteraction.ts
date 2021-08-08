import { translations } from '../../../intl/dictionaries';
import { uniLang } from '../../../intl/Language';
import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActorProp } from '../../../model/content/Common/Prop/ActorProp';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'CustomInteraction',
    title: {
        NL: 'Vrije Interactie',
        EN: 'Vrije Interactie',
    },
    props: {
        from: new ActorProp({ title: translations.fromActor }),
        to: new ActorProp({ title: translations.toActor }),
        description: new StringProp({
            title: {
                NL: 'Omschrijving 1',
                EN: 'Description 1',
            },
        }),
        sub: new StringProp({
            title: {
                NL: 'Omschrijving 2',
                EN: 'Description 2',
            },
        }),
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

/**
 * A custom interaction between two Actors
 */
export class CustomInteraction extends Action<Props> {
    schema = Schema;

    computeOutcomes(): IOutcome[] {
        return [];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        return {
            from: state.props.byActor[this.defProps.from].actor,
            to: state.props.byActor[this.defProps.to].actor,
            title: uniLang(this.defProps.description),
            sub: uniLang(this.defProps.sub),
        };
    }
}
export const CustomInteractionType = new ActionType(Schema, (id, props) => new CustomInteraction(id, props));
