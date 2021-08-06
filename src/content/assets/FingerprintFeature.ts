import { AssetSchema, TypeOfAssetSchema } from '../../model/content/Asset/AssetSchema';
import { AssetType } from '../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const Schema = new AssetSchema({
    typeName: 'FingerprintFeature',
    kindName: 'Feature',
    title: {
        NL: 'Vingerafdruk',
        EN: 'Fingerprint',
    },
    props: {
        subject: CommonProps.subject,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export class FingerprintFeature extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            transferrable: false,
            cloneable: false,
            image: { type: 'fa-icon', name: 'fingerprint' },
        };
    }
}

export const FingerprintFeatureType = new AssetType(
    Schema,
    (id, props, isInitial) => new FingerprintFeature(id, props, isInitial),
);
