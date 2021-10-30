import { Translation } from '../../../../intl/Language';
import { mapValues } from '../../../../util/util';
import { ScenarioState } from '../../../logic/State/ScenarioState';
import { Field } from '../View/Field';
import { PropEvaluatedValues } from './PropEvaluatedValues';
import { PropValues } from './PropValues';
import { RecordOfPropHandlers } from './RecordOfPropHandlers';

/** A collection of content type props */
export class PropHandlerCollection<Props extends RecordOfPropHandlers> {
    constructor(readonly props: Props) {}

    /** Computes the default value of each prop. */
    getDefaultValues(): PropValues<Props> {
        // @ts-ignore
        return mapValues(this.props, (def) => def.getDefaultValue());
    }

    /** Computes the form field properties of each prop. */
    getFormFieldProps(formData: any, state: ScenarioState): Record<string, Field> {
        return mapValues(this.props, (def, key) => def.getFormFieldProps(key, formData, state));
    }

    /** Parses the entire form data. */
    parseUserInput(formData: any, state: ScenarioState): PropValues<Props> {
        // @ts-ignore
        return mapValues(this.props, (def, key) => def.parseUserInput(key, formData, state));
    }

    /** Evaluate the property against the current scenario state */
    evaluateDefinitionProps(defProps: any, state: ScenarioState): PropEvaluatedValues<Props> {
        // @ts-ignore
        return mapValues(this.props, (def, key) => def.evaluateDefinitionProp(key, defProps, state));
    }

    /** Validate whether the prop requirements are satisfied */
    validationDefinitionProps(defProps: any, state: ScenarioState): Array<{ prop: string; error: Translation }> {
        // @ts-ignore
        return Object.entries(this.props)
            .map(([key, def]) => {
                const error = def.validateDefinitionProp(key, defProps, state);

                return error === undefined ? undefined : { prop: key, error: error };
            })
            .filter((r) => r !== undefined);
    }
}
