import { Translation } from '../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../model/content/Asset/AssetSchema';
import { AssetType } from '../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const title: Translation = {
    NL: 'Groene Vlag',
    EN: 'Green Flag',
};

const Schema = new AssetSchema({
    typeName: 'GreenFlag',
    title: {
        NL: 'Groene Vlag',
        EN: 'Green Flag',
    },
    props: {
        description: CommonProps.description,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class GreenFlag extends Asset<Props> {
    protected typeName = 'GreenFlag';
    protected kindName = 'Flag';

    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: this.defProps.description,
            title: title,
        };
    }
}

export const GreenFlagType = new AssetType(Schema, (id, props, isInitial) => new GreenFlag(id, props, isInitial));
