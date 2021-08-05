import { Translation } from '../../../intl/Language';
import { ImageOrIconDefinition } from '../ImageOrIconDefinition';

export interface AssetDesc<Props = any> {
    id: string;
    parentId: string | undefined;
    canHaveChildren?: boolean;
    transferrable: boolean;
    cloneable: boolean;
    isInitial: boolean;
    props: Props;
    type: string;
    kind: string;
    title: Translation;
    sub?: Translation;
    long?: Translation;
    iconUrl?: string;
    propertyDesc: PropDesc[];
    image?: ImageOrIconDefinition;
}

export interface PropDesc {
    title: Translation;
    value: Translation;
}
