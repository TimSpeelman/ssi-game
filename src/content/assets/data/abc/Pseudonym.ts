import { DictionaryEN } from '../../../../intl/dictionaries/EN';
import { DictionaryNL } from '../../../../intl/dictionaries/NL';
import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { StringProp } from '../../../../model/content/Common/Prop/StringProp';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const Schema = new AssetSchema({
    typeName: 'Pseudonym',
    kindName: 'Data',
    title: {
        NL: 'Pseudoniem',
        EN: 'Pseudonym',
    },
    props: {
        identifier: CommonProps.identifier,
        image: new StringProp({ title: { NL: 'afbeelding', EN: 'image' } }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class Pseudonym extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
            title: {
                NL: `${DictionaryNL.pseudonym} ${this.defProps.identifier}`,
                EN: `${DictionaryEN.pseudonym} ${this.defProps.identifier}`,
            },
            transferrable: false,
            cloneable: true,
        };
    }
}

export const PseudonymType = new AssetType(Schema, (id, props, isInitial) => new Pseudonym(id, props, isInitial));
