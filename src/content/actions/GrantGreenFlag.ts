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
import { ucFirst } from '../../util/util';
import { GreenFlag } from '../assets/GreenFlag';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export const Schema = new ActionSchema({
    typeName: 'GrantGreenFlag',
    title: {
        [Language.NL]: 'Groene vlag toekennen',
        [Language.EN]: 'Grant Green Flag',
    },
    props: {
        from: new ActorProp({ title: translations.fromActor }),
        to: new ActorProp({ title: translations.toActor }),
        description: new StringProp({ title: translations.description }),
    },
});

export type Props = TypeOfActionSchema<typeof Schema>;

export class GrantGreenFlag extends Action<Props> {
    schema = Schema;

    validatePreConditions(): IValidationResult[] {
        return [];
    }

    computeOutcomes(): IOutcome[] {
        const flag = new GreenFlag(this.id + '1', {
            description: this.defProps.description,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.to, asset: flag })];
    }

    describe(state: ScenarioState): ActionDesc {
        const from = state.props.byActor[this.defProps.from].actor;
        const to = state.props.byActor[this.defProps.to].actor;
        const desc = this.defProps.description;
        return {
            id: this.id,
            type: this.schema.typeName,
            description: {
                [Language.NL]: `${ucFirst(from.nounPhrase)} geeft ${to.nounPhrase} de groene vlag`,
                [Language.EN]: `${ucFirst(from.nounPhrase)} gives ${to.nounPhrase} the green flag`,
            },
            sub: {
                [Language.NL]: desc,
                [Language.EN]: desc,
            },
            from: from,
            to: to,
            long: {
                [Language.NL]: `${ucFirst(from.nounPhrase)} geeft ${to.nounPhrase} de groene vlag.`,
                [Language.EN]: `${ucFirst(from.nounPhrase)} gives ${to.nounPhrase} the green flag.`,
            },
            locality: Locality.AT_CENTER,
        };
    }
}

export const GrantGreenFlagType = new ActionType(Schema, (id, props) => new GrantGreenFlag(id, props));
