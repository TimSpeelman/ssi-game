import { Translation } from '../../../intl/Language';
import { ActionDef } from '../../definition/Action/ActionDef';
import { ScenarioState } from '../../logic/State/ScenarioState';
import {
    ContentTypeProps,
    DefTypesOfContentTypeProps,
    EvaluatedTypeOfContentProps,
} from '../Common/PropRecord/ContentTypeProps';
import { ContentTypePropsRecord } from '../Common/PropRecord/ContentTypePropsRecord';

/**
 * Define a custom action type schema
 */
export class ActionSchema<Props extends ContentTypeProps> {
    readonly typeName: string;
    readonly title: Translation;
    readonly props: ContentTypePropsRecord<Props>;

    constructor(options: { typeName: string; title: Translation; props: Props }) {
        this.typeName = options.typeName;
        this.title = options.title;
        this.props = new ContentTypePropsRecord(options.props);
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
    parseUserInput(id: string, formData: any, state: ScenarioState): ActionDef {
        return {
            id: id,
            props: this.props.parseUserInput(formData, state),
            typeName: this.typeName,
        };
    }

    /** Based on the active state and the definition, evaluate the props */
    evaluateDefinitionProps(defProps: any, state: ScenarioState): EvaluatedTypeOfContentProps<Props> {
        return this.props.evaluateDefinitionProps(defProps, state);
    }

    validate(defProps: any, state: ScenarioState): Array<{ prop: string; error: Translation }> {
        return this.props.validationDefinitionProps(defProps, state);
    }
}

export type TypeOfActionSchema<T extends ActionSchema<any>> = T extends ActionSchema<infer U> ? U : never;

export type DefTypeOfActionSchema<T extends ActionSchema<any>> = T extends ActionSchema<infer U>
    ? DefTypesOfContentTypeProps<U>
    : never;
