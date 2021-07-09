import { mapValues } from '../../../../util/util';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { ContentTypeProps, DefTypesOfContentTypeProps, EvaluatedTypeOfContentProps } from './ContentTypeProps';

/** Sugar for controlling a collection of content type props */
export class ContentTypePropsRecord<Props extends ContentTypeProps> {
    constructor(readonly props: Props) {}

    /** Computes the default value of each prop. */
    getDefaultValues(): DefTypesOfContentTypeProps<Props> {
        // @ts-ignore
        return mapValues(this.props, (def) => def.getDefaultValue());
    }

    /** Computes the form field properties of each prop. */
    getFormFieldProps(formData: any, state: ScenarioState): Record<string, Field> {
        return mapValues(this.props, (def, key) => def.getFormFieldProps(key, formData, state));
    }

    /** Parses the entire form data. */
    parseUserInput(formData: any, state: ScenarioState): DefTypesOfContentTypeProps<Props> {
        // @ts-ignore
        return mapValues(this.props, (def, key) => def.parseUserInput(key, formData, state));
    }

    /** Parses the entire form data. */
    evaluateDefinitionProps(defProps: any, state: ScenarioState): EvaluatedTypeOfContentProps<Props> {
        // @ts-ignore
        return mapValues(this.props, (def, key) => def.evaluateDefinitionProp(key, defProps, state));
    }
}
