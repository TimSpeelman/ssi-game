import { AssetSchema, TypeOfAssetSchema } from '../../model/content/Asset/AssetSchema';
import { AssetType } from '../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const Schema = new AssetSchema({
    typeName: 'Consent',
    kindName: 'Data',
    title: {
        NL: 'Toestemming',
        EN: 'Consent',
    },
    props: {
        subject: CommonProps.subject,
        verifier: CommonProps.verifier,
        attributeName: CommonProps.attributeName,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class Consent extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            transferrable: false,
            cloneable: true,
        };
    }
}

export const ConsentType = new AssetType(Schema, (id, props, isInitial) => new Consent(id, props, isInitial));
