import { AssetDialogContainer, EditAssetDialogOptions } from './Asset/AssetDialogContainer';
import { useDialogService } from './DialogContext';

/** Register all global dialog options (for type safety) */
interface IGlobalDialogs {
    EditAsset: EditAssetDialogOptions;
}

/** Register all global dialog components */
export const GlobalDialogs: { [K in keyof IGlobalDialogs]: React.FC<DialogProps<IGlobalDialogs[K]>> } = {
    EditAsset: AssetDialogContainer,
};

/** Use this hook to open a dialog */
export function useDialog() {
    const { open } = useDialogService();
    const typedOpen: OpenFn = (key, options) => open(key, options);
    return { open: typedOpen };
}

export type OpenFn = <K extends keyof IGlobalDialogs>(key: K, options: IGlobalDialogs[K]) => Promise<void>;

interface DialogProps<Options> {
    onCancel: () => void;
    onSubmit: () => void;
    options: Options;
}
