import { translations } from '../../../intl/dictionaries';
import { TypeOfActionSchema } from '../../../model/content/Action/ActionSchema';
import { ActionType } from '../../../model/content/Action/ActionType';
import { ActorProp } from '../../../model/content/Common/Prop/ActorProp';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { Locality } from '../../../model/description/Step/ActionDesc';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { Action, BaseSchema, CustomActionDesc } from '../../../model/logic/Step/Action';
import { IOutcome } from '../../../model/logic/Step/IOutcome';
import { ucFirst } from '../../../util/util';
import { GreenFlag } from '../assets/GreenFlag';
import { GainAssetOutcome } from '../outcomes/GainAssetOutcome';

export const Schema = BaseSchema.extend({
    typeName: 'GrantGreenFlag',
    title: {
        NL: 'Groene vlag toekennen',
        EN: 'Grant Green Flag',
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

    computeOutcomes(): IOutcome[] {
        const flag = new GreenFlag(this.id + '1', {
            description: this.defProps.description,
        });
        return [new GainAssetOutcome({ actorId: this.defProps.to, asset: flag })];
    }

    _describe(state: ScenarioState): CustomActionDesc {
        const from = state.props.byActor[this.defProps.from].actor;
        const to = state.props.byActor[this.defProps.to].actor;
        const desc = this.defProps.description;
        return {
            title: {
                NL: `${ucFirst(from.nounPhrase)} geeft ${to.nounPhrase} de groene vlag`,
                EN: `${ucFirst(from.nounPhrase)} gives ${to.nounPhrase} the green flag`,
            },
            sub: {
                NL: desc,
                EN: desc,
            },
            from: from,
            to: to,
            long: {
                NL: `${ucFirst(from.nounPhrase)} geeft ${to.nounPhrase} de groene vlag.`,
                EN: `${ucFirst(from.nounPhrase)} gives ${to.nounPhrase} the green flag.`,
            },
            locality: Locality.AT_CENTER,
        };
    }
}

export const GrantGreenFlagType = new ActionType(Schema, (id, props) => new GrantGreenFlag(id, props));
