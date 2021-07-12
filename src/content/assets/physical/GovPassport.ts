import { translations } from '../../../intl/dictionaries';
import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { StringProp } from '../../../model/content/Common/Prop/StringProp';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../common/props';

const Schema = new AssetSchema({
    typeName: 'GovPassport',
    kindName: 'Physical',
    title: {
        NL: 'Paspoort',
        EN: 'Passport',
    },
    props: {
        subject: CommonProps.subject,
        identifier: new StringProp({ title: translations.identifier }),
        name: new StringProp({ title: translations.name }),
        firstName: new StringProp({ title: translations.firstName }),
        dateOfBirth: new StringProp({ title: translations.dateOfBirth }),
        placeOfIssuance: new StringProp({ title: translations.placeOfIssuance }),
        placeOfBirth: new StringProp({ title: translations.placeOfBirth }),
        dateOfIssuance: new StringProp({ title: translations.dateOfIssuance }),
        dateOfExpiry: new StringProp({ title: translations.dateOfExpiry }),
        height: new StringProp({ title: translations.height }),
        documentNumber: new StringProp({ title: translations.documentNumber }),
        nationality: new StringProp({ title: translations.nationality }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class GovPassport extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            title: {
                EN: `Passport of ${this.defProps.firstName} ${this.defProps.name}`,
                NL: `Paspoort van ${this.defProps.firstName} ${this.defProps.name}`,
            },
            sub: JSON.stringify(this.defProps),
            transferrable: true,
            cloneable: false,
        };
    }
}

export const GovPassportType = new AssetType(Schema, (id, props, isInitial) => new GovPassport(id, props, isInitial));
