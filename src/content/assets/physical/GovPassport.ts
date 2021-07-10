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
        name: new StringProp({ title: translations.name }),
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class GovPassport extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.defProps),
        };
    }
}

export const GovPassportType = new AssetType(Schema, (id, props, isInitial) => new GovPassport(id, props, isInitial));
