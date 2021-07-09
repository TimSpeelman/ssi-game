import { Translation } from '../../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const title: Translation = {
    NL: 'Administratief Beeld',
    EN: 'Human Record',
};

const Schema = new AssetSchema({
    typeName: 'HumanRecord',
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
    protected typeName = 'HumanRecord';
    protected kindName = 'Data';

    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: title,
        };
    }
}

export const HumanRecordType = new AssetType(Schema, (id, props, isInitial) => new HumanRecord(id, props, isInitial));
