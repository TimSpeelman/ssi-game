import { Translation } from '../../../../intl/Language';
import { ActorState } from '../../../logic/State/ActorState';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { IPropHandler } from '../Schema/IPropHandler';
import { ActorField } from './ActorField';

export interface ActorPropOptions {
    title: Translation;
    helperText?: Translation;
    dependsOn?: string[];
    filter?: (a: ActorState, formData: any) => boolean;
    autoFill?: boolean;
    required?: Translation;
}

export class ActorProp implements IPropHandler<string, ActorState, ActorField> {
    get title() {
        return this.options.title;
    }

    constructor(readonly options: ActorPropOptions) {}

    extend(options: Partial<ActorPropOptions>) {
        return new ActorProp({ ...this.options, ...options });
    }

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(key: string, formData: any, state: ScenarioState): ActorField {
        const allItems = Object.values(state.props.byActor);
        const filteredItems = this.options.filter
            ? allItems.filter((a) => this.options.filter!(a, formData))
            : allItems;
        const items = filteredItems.map((a) => a.actor);

        const disabled = (this.options.dependsOn || []).every((k) => !!formData[k])
            ? undefined
            : {
                  EN: 'This field depends on ' + this.options.dependsOn!.join(', '),
                  NL: 'Dit veld is afhankelijk van ' + this.options.dependsOn!.join(', '),
              };

        const autoFill = this.options.autoFill ? items[0]?.id : undefined;
        const defaultValue = autoFill || this.getDefaultValue();
        const value = !formData[key] || formData[key] === '' ? defaultValue : formData[key];

        const hasError = !value && this.options.required;
        const errorMessage =
            typeof this.options.required === 'object'
                ? this.options.required
                : {
                      NL: 'Dit veld is vereist',
                      EN: 'This field is required',
                  };

        return {
            type: 'actor',
            title: this.options.title,
            helperText: this.options.helperText,
            options: items,
            value,
            disabled,
            error: hasError ? errorMessage : undefined,
            required: !!this.options.required,
        };
    }

    /** Validate and parse the property */
    parseUserInput(key: string, formData: any, state: ScenarioState): string {
        // TODO Validate
        const actorId = formData[key] as string;
        return actorId;
    }

    /** Computes the prop to be used in the back-end, based on the user defined value. */
    evaluateDefinitionProp(key: string, defProps: any, state: ScenarioState): ActorState | undefined {
        const actorId = defProps[key] as string;
        return state.props.byActor[actorId];
    }

    /** Validate whether the prop requirements are satisfied */
    validateDefinitionProp(key: string, defProps: any, state: ScenarioState): Translation | undefined {
        if (this.options.required && (!defProps[key] || !this.evaluateDefinitionProp(key, defProps, state))) {
            return this.options.required;
        }
    }
}
