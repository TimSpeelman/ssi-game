import { mapValues } from '../../../../util/util';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { ContentTypeProps, DefTypesOfContentTypeProps, EvaluatedTypeOfContentProps } from './ContentTypeProps';

/** Sugar for controlling a collection of content type props */
export class ContentTypePropsRecord<Props extends ContentTypeProps> {
    constructor(readonly props: Props) {
        this.assertCorrectPropKeys(props);
    }

    /** Computes the default value of each prop. */
    getDefaultValues(): DefTypesOfContentTypeProps<Props> {
        // @ts-ignore
        return mapValues(this.props, (def) => def.getDefaultValue());
    }

    /** Computes the form field properties of each prop. */
    getFormFieldProps(formData: any, state: ScenarioState): Record<string, Field> {
        return mapValues(this.props, (def) => def.getFormFieldProps(formData, state));
    }

    /** Parses the entire form data. */
    parseUserInput(formData: any, state: ScenarioState): DefTypesOfContentTypeProps<Props> {
        // @ts-ignore
        return mapValues(this.props, (def) => def.parseUserInput(formData, state));
    }

    /** Parses the entire form data. */
    evaluateDefinitionProps(defProps: any, state: ScenarioState): EvaluatedTypeOfContentProps<Props> {
        // @ts-ignore
        return mapValues(this.props, (def) => def.evaluateDefinitionProp(defProps, state));
    }

    protected assertCorrectPropKeys(props: Props) {
        const entries = Object.entries(props);
        for (const [key, prop] of entries) {
            if (prop.key !== key) {
                throw new Error(`Illegal props record, at key '${key}' prop was found with key '${prop.key}'`);
            }
        }
    }
}
