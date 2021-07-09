import { mapValues } from '../../../util/util';
import { ScenarioState } from '../../logic/State/ScenarioState';
import { ContentTypeProps } from './PropRecord/ContentTypeProps';
import { Field } from './View/Field';

/**
 * Helps define game content types like Assets and Actions.
 */
export class ContentType<Props extends ContentTypeProps> {
    constructor(readonly props: Props) {}

    /** Get the default form data for this content type */
    getDefaultFormFieldData(): Record<string, any> {
        return mapValues(this.props, (def) => def.getDefaultValue());
    }

    /** Compute field props based on form data */
    getFormFieldProps(formData: any, state: ScenarioState): Record<string, Field> {
        return mapValues(this.props, (def) => def.getFormFieldProps(state, formData));
    }

    /** Compute the type props based on state */
    transformDefPropsToTypeProps(formData: any, state: ScenarioState): Record<string, Field> {
        return mapValues(this.props, (def) => def.getFormFieldProps(state, formData));
    }
}
