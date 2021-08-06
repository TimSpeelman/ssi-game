import { DefaultLibrary } from '../../../content';
import { AssetDef } from '../../definition/Asset/AssetDef';
import { ScenarioDef } from '../../definition/ScenarioDef';
import { Scenario } from '../../logic/Scenario/Scenario';
import { AssetFormData } from './AssetFormData';
import { AssetTypesCollection } from './AssetTypesCollection';

/** An interface used by the UI to handle the Asset Creation and Update form */
export class AssetFormHandler {
    constructor(readonly assetTypes: AssetTypesCollection) {}

    public listAvailableAssetTypes() {
        return Object.values(this.assetTypes.types).map((a) => ({
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
        const state = new Scenario(scenarioDefinition, DefaultLibrary).getPreStateAtIndex(currentStepIndex);
        if (!selectedAssetType) {
            return undefined;
        } else {
            const asset = this.assetTypes.requireTypeByName(selectedAssetType).schema;
            const fields = asset.computeFormProperties(formData, state);
            return {
                typeName: asset.typeName,
                title: asset.title,
                description: asset.description,
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
        parentId?: string,
    ): AssetDef {
        const state = new Scenario(scenarioDefinition, DefaultLibrary).getPreStateAtIndex(currentStepIndex);
        const action = this.assetTypes.requireTypeByName(selectedAssetType).schema;
        return action.parseUserInput(id, formData, state, parentId);
    }
}
