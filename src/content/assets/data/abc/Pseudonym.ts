import { pseudonymImage } from '../../../../config/pseudonymImage';
import { DictionaryEN } from '../../../../intl/dictionaries/EN';
import { DictionaryNL } from '../../../../intl/dictionaries/NL';
import { uniLang } from '../../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { ImageSelectProp } from '../../../../model/content/Common/Prop/ImageSelectProp';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { ucFirst } from '../../../../util/util';
import { CommonProps } from '../../../common/props';
import { pseudonyms } from '../../pseudonyms';

const images = pseudonyms.map((p) => ({
    id: p,
    imageUrl: pseudonymImage(p),
    title: uniLang(ucFirst(p).replace('_', ' ')),
}));

const Schema = new AssetSchema({
    typeName: 'Pseudonym',
    kindName: 'Data',
    title: {
        NL: 'Pseudoniem',
        EN: 'Pseudonym',
    },
    props: {
        identifier: CommonProps.identifier,
        image: new ImageSelectProp({ title: { NL: 'Afbeelding', EN: 'Image' }, items: images }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class Pseudonym extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            title: {
                NL: `${DictionaryNL.pseudonym} ${this.defProps.identifier}`,
                EN: `${DictionaryEN.pseudonym} ${this.defProps.identifier}`,
            },
            transferrable: false,
            cloneable: true,
            iconUrl: pseudonymImage(this.defProps.image),
        };
    }
}

export const PseudonymType = new AssetType(Schema, (id, props, isInitial) => new Pseudonym(id, props, isInitial));
