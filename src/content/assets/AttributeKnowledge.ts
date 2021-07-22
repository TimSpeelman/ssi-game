import { AssetSchema, TypeOfAssetSchema } from '../../model/content/Asset/AssetSchema';
import { AssetType } from '../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';
import { Pseudonym } from './Pseudonym';

const Schema = new AssetSchema({
    typeName: 'AttributeKnowledge',
    kindName: 'Data',
    title: {
        NL: 'Attribuutkennis',
        EN: 'Attribute knowledge',
    },
    props: {
        subjectNym: CommonProps.subjectNym,
        issuerNym: CommonProps.issuerNym,
        attributeName: CommonProps.attributeName,
        attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export class AttributeKnowledge extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        const { subjectNym, issuerNym, attributeName, attributeValue } = this.evaluateProps(state);
        const sNym: Pseudonym | undefined = subjectNym;
        const iNym: Pseudonym | undefined = issuerNym;

        const attrDesc = attributeValue ? `${attributeName}: ${attributeValue}` : attributeName;
        return {
            transferrable: false,
            cloneable: true,
            sub: {
                NL: `${sNym?.defProps.identifier} heeft attribuut ${attrDesc} (volgens ${iNym?.defProps.identifier}).`,
                EN: `${sNym?.defProps.identifier} has attribute ${attrDesc} (according to ${iNym?.defProps.identifier}).`,
            },
        };
    }
}

export const AttributeKnowledgeType = new AssetType(
    Schema,
    (id, props, isInitial) => new AttributeKnowledge(id, props, isInitial),
);
