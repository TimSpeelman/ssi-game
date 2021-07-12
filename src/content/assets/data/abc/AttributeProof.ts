import { AssetSchema, TypeOfAssetSchema } from '../../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { CommonProps } from '../../../common/props';

const Schema = new AssetSchema({
    typeName: 'AttributeProof',
    kindName: 'Data',
    title: {
        NL: 'Attribuutbewijs',
        EN: 'Attribute proof',
    },
    props: {
        subject: CommonProps.subject,
        issuer: CommonProps.issuer,
        attributeName: CommonProps.attributeName,
        attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/**
 * Attribute Proof is equivalent to Attribute Knowledge, except it enables the possessing Actor to prove it.
 * - Note: a proof could be decomposed into other data elements, but this simplification is made for ease of play.
 */
export class AttributeProof extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        const { issuer } = this.evaluateProps(state);
        return {
            title: {
                NL: 'Credential ' + this.defProps.attributeName,
                EN: 'Credential ' + this.defProps.attributeName,
            },
            sub: {
                NL: 'Uitgegeven door ' + issuer.actor.name,
                EN: 'Issued by ' + issuer.actor.name,
            },
            transferrable: false,
            cloneable: true,
        };
    }
}

export const AttributeProofType = new AssetType(
    Schema,
    (id, props, isInitial) => new AttributeProof(id, props, isInitial),
);
