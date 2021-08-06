import { DictionaryEN } from '../../../intl/dictionaries/EN';
import { DictionaryNL } from '../../../intl/dictionaries/NL';
import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { ImageSelectProp } from '../../../model/content/Common/Prop/ImageSelectProp';
import { ImageOrIconDefinition } from '../../../model/description/ImageOrIconDefinition';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const animalIcons = [
    { icon: 'otter', title: { NL: 'Otter', EN: 'Otter' } },
    { icon: 'hippo', title: { NL: 'Nijlpaard', EN: 'Hippo' } },
    { icon: 'dog', title: { NL: 'Hond', EN: 'Dog' } },
    { icon: 'spider', title: { NL: 'Spin', EN: 'Spider' } },
    { icon: 'kiwi-bird', title: { NL: 'Kiwivogel', EN: 'Kiwi Bird' } },
    { icon: 'horse-head', title: { NL: 'Paard', EN: 'Horse' } },
    { icon: 'frog', title: { NL: 'Kikker', EN: 'Frog' } },
    { icon: 'fish', title: { NL: 'Vis', EN: 'Fish' } },
    { icon: 'dragon', title: { NL: 'Draak', EN: 'Dragon' } },
    { icon: 'dove', title: { NL: 'Duif', EN: 'Dove' } },
    { icon: 'crow', title: { NL: 'Kraai', EN: 'Crow' } },
    { icon: 'cat', title: { NL: 'Kat', EN: 'Cat' } },
];

const images = animalIcons.map((p) => ({
    id: p.icon,
    image: { type: 'fa-icon', name: p.icon } as ImageOrIconDefinition,
    title: p.title,
}));

const Schema = new AssetSchema({
    typeName: 'Pseudonym',
    kindName: 'Data',
    title: {
        NL: 'Pseudoniem',
        EN: 'Pseudonym',
    },
    description: {
        NL:
            'Een pseudoniem is een betekenisloze identifier die een subject kan gebruiken om zijn ware identiteit te verhullen.',
        EN: 'A pseudonym is a meaningless identifier which can be used by a subject to hide its true identity.',
    },
    props: {
        subject: CommonProps.subject.extend({
            helperText: {
                NL: 'Het subject die zich met dit pseudoniem associeert.',
                EN: 'The subject that associates itself with this pseudonym.',
            },
        }),
        identifier: CommonProps.identifier,
        image: new ImageSelectProp({ title: { NL: 'Afbeelding', EN: 'Image' }, items: images }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class Pseudonym extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        const { subject, image } = this.evaluateProps(state);
        return {
            title: {
                NL: `${DictionaryNL.pseudonym} ${this.defProps.identifier}`,
                EN: `${DictionaryEN.pseudonym} ${this.defProps.identifier}`,
            },
            sub: {
                NL: `Hoort bij ${subject?.actor.nounPhrase}.`,
                EN: `Belongs to ${subject?.actor.nounPhrase}.`,
            },
            long: this.schema.description,
            transferrable: false,
            cloneable: true,
            image: image,
        };
    }
}

export const PseudonymType = new AssetType(Schema, (id, props, isInitial) => new Pseudonym(id, props, isInitial));
