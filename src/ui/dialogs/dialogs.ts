import { AddActorDialogCtr, AddActorDialogOptions } from './Actor/AddActorDialogCtr';
import { EditActorDialogCtr, EditActorDialogOptions } from './Actor/EditActorDialogCtr';
import { EditActorPropertiesDialogCtr, EditActorPropertiesDialogOptions } from './Actor/EditActorPropertiesDialogCtr';
import { AddAssetDialogCtr, AddAssetDialogOptions } from './Asset/AddAssetDialogCtr';
import { EditAssetDialogCtr, EditAssetDialogOptions } from './Asset/EditAssetDialogCtr';
import { useDialogService } from './DialogContext';
import { EditScenarioMetaDialogCtr } from './Meta/EditScenarioMetaDialogCtr';
import { AddStepDialogCtr, AddStepDialogOptions } from './Step/AddStepDialogCtr';
import { EditStepDialogCtr, EditStepDialogOptions } from './Step/EditStepDialogCtr';

/** Register all global dialog options (for type safety) */
interface IGlobalDialogs {
    AddStep: AddStepDialogOptions;
    EditStep: EditStepDialogOptions;
    AddAsset: AddAssetDialogOptions;
    EditAsset: EditAssetDialogOptions;
    AddActor: AddActorDialogOptions;
    EditActor: EditActorDialogOptions;
    EditActorProperties: EditActorPropertiesDialogOptions;
    EditMeta: void;
}

/** Register all global dialog components */
export const GlobalDialogs: { [K in keyof IGlobalDialogs]: React.FC<DialogProps<IGlobalDialogs[K]>> } = {
    AddStep: AddStepDialogCtr,
    EditStep: EditStepDialogCtr,
    AddAsset: AddAssetDialogCtr,
    EditAsset: EditAssetDialogCtr,
    AddActor: AddActorDialogCtr,
    EditActor: EditActorDialogCtr,
    EditActorProperties: EditActorPropertiesDialogCtr,
    EditMeta: EditScenarioMetaDialogCtr,
};

/** Use this hook to open a dialog */
export function useDialog() {
    const { open } = useDialogService();
    const typedOpen: OpenFn = (key, options) => open(key, options);
    return { openDialog: typedOpen };
}

export type OpenFn = <K extends keyof IGlobalDialogs>(key: K, options: IGlobalDialogs[K]) => Promise<void>;

interface DialogProps<Options> {
    onCancel: () => void;
    onSubmit: () => void;
    options: Options;
}
