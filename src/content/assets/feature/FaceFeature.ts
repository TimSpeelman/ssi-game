import { Translation } from '../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../common/props';

const title: Translation = {
    NL: 'Gezicht',
    EN: 'Face',
};

const Schema = new AssetSchema({
    typeName: 'FaceFeature',
    title: {
        NL: 'Gezicht',
        EN: 'Face',
    },
    props: {
        subject: CommonProps.subject,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class FaceFeature extends Asset<Props> {
    protected typeName = 'FaceFeature';
    protected kindName = 'Feature';

    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: title,
        };
    }
}

export const FaceFeatureType = new AssetType(Schema, (id, props, isInitial) => new FaceFeature(id, props, isInitial));
