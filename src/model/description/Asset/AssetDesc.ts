import { Translation } from '../../../intl/Language';
import { ImageOrIconDefinition } from '../../common/ImageOrIconDefinition';

/**
 * An Asset Description is used by the UI to display Assets. It is produced by the AssetTypes in
 * a ContentLibrary.
 */
export interface AssetDesc<Props = any> {
    id: string;

    /** The asset kind */
    kind: string;

    /** The asset type, used for (de)serialisation */
    type: string;

    /** ID of parent asset. If provided, asset will be nested */
    parentId: string | undefined;

    /** If set to true, UI will show a 'contents' collection for this asset */
    canHaveChildren?: boolean;

    /**
     * If set to true, this asset can be selected for transfer
     * TODO: this is a ContentLibrary concern, not supposed to be on the view model
     */
    transferrable: boolean;

    /**
     * If set to true, this asset can be selected for cloning
     * TODO: this is a ContentLibrary concern, not supposed to be on the view model
     */
    cloneable: boolean;

    /** If true, this asset is part of the initial state */
    isInitial: boolean;

    /** The asset's custom properties */
    props: Props;

    /** A title describing the asset */
    title: Translation;

    /** A subtitle describing the asset */
    sub?: Translation;

    /** A long description of the asset */
    long?: Translation;

    /** An optional image or icon for the asset */
    image?: ImageOrIconDefinition;

    /** A list of property descriptors */
    propertyDesc: PropDesc[];
}

export interface PropDesc {
    title: Translation;
    value: Translation;
}
