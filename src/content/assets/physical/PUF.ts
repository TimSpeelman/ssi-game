import { Translation } from '../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';

const title: Translation = {
    NL: 'Physically Uncloneable Function (PUF)',
    EN: 'Physically Uncloneable Function (PUF)',
};

const Schema = new AssetSchema({
    typeName: 'PUF',
    title: {
        NL: 'Physically Uncloneable Function (PUF)',
        EN: 'Physically Uncloneable Function (PUF)',
    },
    props: {
        secret: new StringProp({
            title: {
                NL: 'Geheim',
                EN: 'Secret',
            },
        }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/**
 * A physically uncloneable function (PUF).
 *
 * "physical object that for a given input and conditions (challenge), provides a physically-defined "digital fingerprint" output (response) that serves as a unique identifier"
 * - https://en.wikipedia.org/wiki/Physical_unclonable_function
 */
export class PUF extends Asset<Props> {
    protected typeName = 'PUF';
    protected kindName = 'Physical';

    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: title,
        };
    }
}

export const PUFType = new AssetType(Schema, (id, props, isInitial) => new PUF(id, props, isInitial));
