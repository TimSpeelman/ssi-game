import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const Schema = new AssetSchema({
    typeName: 'HumanRecord',
    kindName: 'Data',
    title: {
        NL: 'Administratief Beeld',
        EN: 'Human Record',
    },
    props: {
        subject: CommonProps.subject,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class HumanRecord extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: this.schema.title,
        };
    }
}

export const HumanRecordType = new AssetType(Schema, (id, props, isInitial) => new HumanRecord(id, props, isInitial));
