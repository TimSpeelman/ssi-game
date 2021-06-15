import { Translation } from '../../../intl/Language';

export interface AssetDesc<Props = any> {
    id: string;
    parentId: string | undefined;
    canHaveChildren?: boolean;
    isInitial: boolean;
    props: Props;
    type: string;
    kind: string;
    title: Translation;
    sub: string;
}
