import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const Schema = new AssetSchema({
    typeName: 'AttributeKnowledge',
    kindName: 'Data',
    title: {
        NL: 'Attribuutkennis',
        EN: 'Attribute knowledge',
    },
    props: {
        subject: CommonProps.subject,
        issuer: CommonProps.issuer,
        attributeName: CommonProps.attributeName,
        attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeKnowledge extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
        };
    }
}

export const AttributeKnowledgeType = new AssetType(
    Schema,
    (id, props, isInitial) => new AttributeKnowledge(id, props, isInitial),
);
