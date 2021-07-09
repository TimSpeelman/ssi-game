import { Translation } from '../../../../intl/Language';
import { ActorState } from '../../../logic/State/ActorState';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { IContentTypeProp } from './IContentTypeProp';

export interface ActorPropOptions {
    title: Translation;
    dependsOn?: string[];
    filter?: (a: ActorState) => boolean;
    autoFill?: boolean;
}

export class ActorProp implements IContentTypeProp<string, ActorState> {
    constructor(readonly key: string, readonly options: ActorPropOptions) {}

    /** Computes the default value. */
    getDefaultValue() {
        return '';
    }

    /** Computes the field properties to display in the creation or edit form. */
    getFormFieldProps(formData: any, state: ScenarioState): Field {
        const allActors = Object.values(state.props.byActor);
        const filteredActors = this.options.filter ? allActors.filter(this.options.filter) : allActors;
        const actors = filteredActors.map((a) => a.actor);
        return {
            type: 'actor',
            title: this.options.title,
            options: actors,
            // @ts-ignore
            value: formData[this.key],
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
