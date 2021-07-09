import { Asset } from '../../logic/Asset/Asset';
import { ContentTypeProps, DefTypesOfContentTypeProps } from '../Common/PropRecord/ContentTypeProps';
import { AssetSchema } from './AssetSchema';

export class AssetType<Props extends ContentTypeProps> {
    constructor(
        readonly schema: AssetSchema<Props>,
        readonly factory: (id: string, props: DefTypesOfContentTypeProps<Props>, isInitial?: boolean) => Asset<Props>,
    ) {}
}
