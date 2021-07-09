import { AssetDef } from '../../definition/Asset/AssetDef';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { Scenario } from '../../logic/Scenario/Scenario';
import { AssetFormData } from './AssetFormData';
import { AssetTypesCollection } from './AssetTypesCollection';

/** An interface used by the UI to handle the Asset Creation and Update form */
export class AssetFormHandler {
    constructor(readonly actionTypes: AssetTypesCollection) {}

    public listAvailableAssetTypes() {
        return Object.values(this.actionTypes.types).map((a) => ({
            typeName: a.schema.typeName,
            title: a.schema.title,
        }));
    }

    public computeFormProperties(
        scenarioDefinition: ScenarioDef,
        currentStepIndex: number,
        selectedAssetType: string | undefined,
        formData: any,
    ): AssetFormData | undefined {
        const state = new Scenario(scenarioDefinition).getPostStateAtIndex(currentStepIndex);
        if (!selectedAssetType) {
            return undefined;
        } else {
            const action = this.actionTypes.requireTypeByName(selectedAssetType).schema;
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
        selectedAssetType: string,
        formData: any,
        id: string,
    ): AssetDef {
        const state = new Scenario(scenarioDefinition).getPostStateAtIndex(currentStepIndex);
        const action = this.actionTypes.requireTypeByName(selectedAssetType).schema;
        return action.parseUserInput(id, formData, state);
    }
}
