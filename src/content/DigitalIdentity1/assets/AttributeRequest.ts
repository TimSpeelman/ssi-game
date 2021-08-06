import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';

const Schema = new AssetSchema({
    typeName: 'AttributeRequest',
    kindName: 'Data',
    title: {
        NL: 'Attribuutverzoek',
        EN: 'Attribuut request',
    },
    props: {
        subject: CommonProps.subject,
        verifier: CommonProps.verifier,
        attributeName: CommonProps.attributeName,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

export class AttributeRequest extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            transferrable: false,
            cloneable: true,
            image: { type: 'fa-icon', name: 'question' },
        };
    }
}

export const AttributeRequestType = new AssetType(
    Schema,
    (id, props, isInitial) => new AttributeRequest(id, props, isInitial),
);
