import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const Schema = new AssetSchema({
    typeName: 'FaceFeature',
    kindName: 'Feature',
    title: {
        NL: 'Gezicht',
        EN: 'Face',
    },
    image: { type: 'fa-icon', name: 'grin-beam' },
    props: {
        subject: CommonProps.subject,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class FaceFeature extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            transferrable: false,
            cloneable: false,
        };
    }
}

export const FaceFeatureType = new AssetType(Schema, (id, props, isInitial) => new FaceFeature(id, props, isInitial));
