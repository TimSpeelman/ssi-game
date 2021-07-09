import { translations } from '../../intl/dictionaries';
import { Language } from '../../intl/Language';
import { ActionSchema, TypeOfActionSchema } from '../../model/content/Action/ActionSchema';
import { ActionType } from '../../model/content/Action/ActionType';
import { ActorProp } from '../../model/content/Common/Prop/ActorProp';
import { StringProp } from '../../model/content/Common/Prop/StringProp';
import { ActionDesc, Locality } from '../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { Action } from '../../model/logic/Step/Action';
import { IOutcome } from '../../model/logic/Step/IOutcome';
import { IValidationResult } from '../../model/logic/Step/IValidationResult';

export const CustomInteractionSchema = new ActionSchema({
    typeName: 'CustomInteraction',
    title: {
        [Language.NL]: 'Vrije Interactie',
        [Language.EN]: 'Vrije Interactie',
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

export type Props = TypeOfActionSchema<typeof CustomInteractionSchema>;

/**
 * A custom interaction between two Actors
 */
export class CustomInteraction extends Action<Props> {
    typeName = 'CustomInteraction';

    schema = CustomInteractionSchema;

    validatePreConditions(): IValidationResult[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        return [];
    }

    describe(state: ScenarioState): ActionDesc {
        return {
            id: this.id,
            type: this.typeName,
            from: state.props.byActor[this.defProps.from].actor,
            to: state.props.byActor[this.defProps.to].actor,
            description: {
                [Language.NL]: this.defProps.description,
                [Language.EN]: this.defProps.description,
            },
            sub: {
                [Language.NL]: this.defProps.sub,
                [Language.EN]: this.defProps.sub,
            },
            locality: Locality.REMOTE,
        };
    }
}
export const CustomInteractionType = new ActionType(
    CustomInteractionSchema,
    (id, props) => new CustomInteraction(id, props),
);
