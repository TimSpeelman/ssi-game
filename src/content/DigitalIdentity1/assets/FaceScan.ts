import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const Schema = new AssetSchema({
    typeName: 'FaceScan',
    kindName: 'Data',
    title: {
        NL: 'Portret',
        EN: 'Face Scan',
    },
    image: { type: 'fa-icon', name: 'grin-beam' },
    props: {
        subject: CommonProps.subject,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class FaceScan extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            transferrable: false,
            cloneable: true,
        };
    }
}

export const FaceScanType = new AssetType(Schema, (id, props, isInitial) => new FaceScan(id, props, isInitial));
