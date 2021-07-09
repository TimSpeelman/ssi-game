import { Language, Translation } from '../../../../intl/Language';
import { ActorState } from '../../../logic/State/ActorState';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface ActorPropOptions {
    title: Translation;
    dependsOn?: string[];
    filter?: (a: ActorState, formData: any) => boolean;
    autoFill?: boolean;
}

export class ActorProp implements IContentTypeProp<string, ActorState> {
    get title() {
        return this.options.title;
    }

    constructor(readonly key: string, readonly options: ActorPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(formData: any, state: ScenarioState): Field {
        const allItems = Object.values(state.props.byActor);
        const filteredItems = this.options.filter
            ? allItems.filter((a) => this.options.filter!(a, formData))
            : allItems;
        const items = filteredItems.map((a) => a.actor);

        const disabled = (this.options.dependsOn || []).every((k) => !!formData[k])
            ? undefined
            : {
                  [Language.EN]: 'This field depends on ' + this.options.dependsOn!.join(', '),
                  [Language.NL]: 'Dit veld is afhankelijk van ' + this.options.dependsOn!.join(', '),
              };

        const autoFill = this.options.autoFill ? items[0]?.id : undefined;
        const defaultValue = autoFill || this.getDefaultValue();
        const value = !formData[this.key] || formData[this.key] === '' ? defaultValue : formData[this.key];
        return {
            type: 'actor',
            title: this.options.title,
            options: items,
            // @ts-ignore
            value,
            disabled,
        };
    }

    /** Validate and parse the property */
    parseUserInput(formData: any, state: ScenarioState): string {
        // TODO Validate
        const actorId = formData[this.key] as string;
        return actorId;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(defProps: any, state: ScenarioState): ActorState | undefined {
        const actorId = defProps[this.key] as string;
        return state.props.byActor[actorId];
    }
}
