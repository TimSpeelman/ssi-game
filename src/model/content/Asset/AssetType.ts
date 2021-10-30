import { Asset } from '../../logic/Asset/Asset';
import { PropValues } from '../Common/Schema/PropValues';
import { RecordOfPropHandlers } from '../Common/Schema/RecordOfPropHandlers';
import { AssetSchema } from './AssetSchema';

export class AssetType<Props extends RecordOfPropHandlers> {
    constructor(
        readonly schema: AssetSchema<Props>,
        readonly factory: (id: string, props: PropValues<Props>, isInitial?: boolean) => Asset<Props>,
    ) {}
}
