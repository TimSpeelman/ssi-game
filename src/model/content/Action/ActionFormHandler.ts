import { ActionDef } from '../../definition/Action/ActionDef';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { Scenario } from '../../logic/Scenario/Scenario';
import { ActionFormData } from './ActionFormData';
import { ActionTypesCollection } from './ActionTypesCollection';

/** An interface used by the UI to handle the Action Creation and Update form */
export class ActionFormHandler {
    constructor(readonly actionTypes: ActionTypesCollection) {}

    public listAvailableActionTypes() {
        return Object.values(this.actionTypes.types).map((a) => ({
            typeName: a.schema.typeName,
            title: a.schema.title,
        }));
    }

    public computeFormProperties(
        scenarioDefinition: ScenarioDef,
        currentStepIndex: number,
        selectedActionType: string | undefined,
        formData: any,
    ): ActionFormData | undefined {
        const state = new Scenario(scenarioDefinition).getPreStateAtIndex(currentStepIndex);
        if (!selectedActionType) {
            return undefined;
        } else {
            const action = this.actionTypes.requireTypeByName(selectedActionType).schema;
            const fields = action.computeFormProperties(formData, state);
            return {
                typeName: action.typeName,
                title: action.title,
                fields: fields,
            };
        }
    }

    public parseFormData(
        scenarioDefinition: ScenarioDef,
        currentStepIndex: number,
        selectedActionType: string,
        formData: any,
        id: string,
    ): ActionDef {
        const state = new Scenario(scenarioDefinition).getPreStateAtIndex(currentStepIndex);
        const action = this.actionTypes.requireTypeByName(selectedActionType).schema;
        return action.parseUserInput(id, formData, state);
    }
}
