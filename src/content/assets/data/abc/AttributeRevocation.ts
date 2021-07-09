import { Translation } from '../../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const title: Translation = {
    NL: 'Attribuutrevocatie',
    EN: 'Attribute revocation',
};

const Schema = new AssetSchema({
    typeName: 'AttributeRevocation',
    title: {
        NL: 'Attribuutrevocatie',
        EN: 'Attribute revocation',
    },
    props: {
        subject: CommonProps.subject,
        issuer: CommonProps.issuer,
        attributeName: CommonProps.attributeName,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeRevocation extends Asset<Props> {
    protected typeName = 'AttributeRevocation';
    protected kindName = 'Data';

    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: title,
        };
    }
}

export const AttributeRevocationType = new AssetType(
    Schema,
    (id, props, isInitial) => new AttributeRevocation(id, props, isInitial),
);
