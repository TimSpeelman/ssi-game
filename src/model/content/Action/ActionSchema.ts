import { Translation } from '../../../intl/Language';
import { Extend } from '../../../util/types/Extend';
import { mapValues } from '../../../util/util';
import { ActionDef } from '../../definition/Action/ActionDef';
import { ScenarioState } from '../../logic/State/ScenarioState';
import { PropEvaluatedValues } from '../Common/Schema/PropEvaluatedValues';
import { PropValues } from '../Common/Schema/PropValues';
import { RecordOfPropHandlers } from '../Common/Schema/RecordOfPropHandlers';
import { SchemaHandler } from '../Common/Schema/SchemaHandler';

export interface ActionSchemaOptions<Props extends RecordOfPropHandlers> {
    typeName: string;
    title: Translation;
    description?: Translation;
    props: Props;
}

/**
 * Define a custom action type schema
 */
export class ActionSchema<Props extends RecordOfPropHandlers> {
    readonly typeName: string;
    readonly title: Translation;
    readonly description?: Translation;
    readonly props: SchemaHandler<Props>;

    constructor(options: ActionSchemaOptions<Props>) {
        this.typeName = options.typeName;
        this.title = options.title;
        this.description = options.description;
        this.props = new SchemaHandler(options.props);
    }

    extend<NewProps extends RecordOfPropHandlers>(
        options: ActionSchemaOptions<NewProps>,
    ): ActionSchema<Extend<Props, NewProps>> {
        const props: Extend<Props, NewProps> = { ...this.props.props, ...options.props };
        return new ActionSchema({ ...options, props });
    }

    /** Compute display properties */
    computeDisplayProperties(defProps: PropValues<Props>) {
        return mapValues(this.props.props, (p, key) => ({
            title: p.title,
            value: defProps[key],
        }));
    }

    /** Compute the form properties */
    computeFormProperties(formData: any, state: ScenarioState) {
        return this.props.getFormFieldProps(formData, state);
    }

    /** Compute the form properties */
    getFormDefaults() {
        return this.props.getDefaultValues();
    }

    /** Based on the active state and the form input, compute the ActionDef */
    parseUserInput(id: string, formData: any, state: ScenarioState): ActionDef<PropValues<Props>> {
        return {
            id: id,
            props: this.props.parseUserInput(formData, state),
            typeName: this.typeName,
        };
    }

    /** Based on the active state and the definition, evaluate the props */
    evaluateDefinitionProps(defProps: PropValues<Props>, state: ScenarioState): PropEvaluatedValues<Props> {
        return this.props.evaluateDefinitionProps(defProps, state);
    }

    validate(defProps: PropValues<Props>, state: ScenarioState): Array<{ prop: string; error: Translation }> {
        return this.props.validationDefinitionProps(defProps, state);
    }
}

export type TypeOfActionSchema<T extends ActionSchema<any>> = T extends ActionSchema<infer U> ? U : never;

export type DefTypeOfActionSchema<T extends ActionSchema<any>> = T extends ActionSchema<infer U>
    ? PropValues<U>
    : never;
