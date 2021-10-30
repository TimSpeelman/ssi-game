import { Translation } from '../../../../intl/Language';
import { mapValues } from '../../../../util/util';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { PropEvaluatedValues } from './PropEvaluatedValues';
import { PropFieldTypes } from './PropFieldTypes';
import { PropValues } from './PropValues';
import { RecordOfPropHandlers } from './RecordOfPropHandlers';

/**
 * A Content Type Schema is responsible for the following operations regarding a
 * type defined in a Content Library:
 * - Handles user input (RawInput => PropFieldTypes)
 * - Parses user input (RawInput => PropValues)
 * - Validates definitions (PropValues => Validation)
 * - Evaluates definitions (PropValues => PropEvaluatedValues)
 */
export class SchemaHandler<Props extends RecordOfPropHandlers> {
    constructor(readonly props: Props) {}

    /** Computes the default value of each prop. */
    getDefaultValues(): PropValues<Props> {
        // @ts-ignore
        return mapValues(this.props, (def) => def.getDefaultValue());
    }

    /** Computes the form field properties of each prop. */
    getFormFieldProps(formData: any, state: ScenarioState): PropFieldTypes<Props> {
        const props = mapValues(this.props, (def, key) => def.getFormFieldProps(key, formData, state));
        // @ts-ignore
        return props;
    }

    /** Parses the entire form data. */
    parseUserInput(formData: any, state: ScenarioState): PropValues<Props> {
        const input = mapValues(this.props, (def, key) => def.parseUserInput(key, formData, state));
        // @ts-ignore
        return input;
    }

    /** Evaluate the property against the current scenario state */
    evaluateDefinitionProps(defProps: any, state: ScenarioState): PropEvaluatedValues<Props> {
        const values = mapValues(this.props, (def, key) => def.evaluateDefinitionProp(key, defProps, state));
        // @ts-ignore
        return values;
    }

    /** Validate whether the prop requirements are satisfied */
    validationDefinitionProps(defProps: any, state: ScenarioState): Array<{ prop: string; error: Translation }> {
        const validationErrors = Object.entries(this.props)
            .map(([key, prop]) => {
                const error = prop.validateDefinitionProp(key, defProps, state);

                return error === undefined ? undefined : { prop: key, error: error };
            })
            .filter((r) => r !== undefined);
        // @ts-ignore
        return validationErrors;
    }
}
