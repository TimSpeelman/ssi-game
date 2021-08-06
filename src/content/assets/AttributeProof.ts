import { uniLang } from '../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../model/content/Asset/AssetSchema';
import { AssetType } from '../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { CommonProps } from '../common/props';
import { Pseudonym } from './Pseudonym';

const Schema = new AssetSchema({
    typeName: 'AttributeProof',
    kindName: 'Data',
    title: {
        NL: 'Attribuutbewijs',
        EN: 'Attribute proof',
    },
    props: {
        subjectNym: CommonProps.subjectNym,
        issuerNym: CommonProps.issuerNym,
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
        const { issuerNym, subjectNym, attributeName, attributeValue } = this.evaluateProps(state);
        const sNym: Pseudonym | undefined = subjectNym;
        const iNym: Pseudonym | undefined = issuerNym;
        const schemaProps = this.schema.props.props;
        const attributeLabel =
            this.defProps.attributeValue === ''
                ? this.defProps.attributeName
                : `${this.defProps.attributeName}: ${this.defProps.attributeValue}`;
        return {
            title: {
                NL: 'Credential ' + this.defProps.attributeName,
                EN: 'Credential ' + this.defProps.attributeName,
            },
            sub: {
                NL: 'Uitgegeven door ' + iNym?.defProps.identifier,
                EN: 'Issued by ' + iNym?.defProps.identifier,
            },
            long: {
                NL: `Dit credential stelt de houder van het [#${sNym?.id}](pseudoniem "${sNym?.defProps.identifier}") in staat te bewijzen dat hij het attribuut
                "${attributeLabel}" heeft. Het credential toont aan dat het is uitgegeven door de
                houder van het [#${iNym?.id}](pseudoniem "${iNym?.defProps.identifier}").`,
                EN: `This credential enables the holder of the [#${sNym?.id}](pseudonym "${sNym?.defProps.identifier}") to prove the attribute
                "${attributeLabel}" applies to him/her. The credential shows it was issued by the 
                holder of the [#${iNym?.id}](pseudonym "${iNym?.defProps.identifier}").`,
            },
            transferrable: false,
            cloneable: true,
            propertyDesc: [
                { title: schemaProps.subjectNym.title, value: uniLang(sNym?.defProps.identifier || '') },
                { title: schemaProps.issuerNym.title, value: uniLang(iNym?.defProps.identifier || '') },
                { title: schemaProps.attributeName.title, value: uniLang(attributeName || '') },
                { title: schemaProps.attributeValue.title, value: uniLang(attributeValue || '') },
            ],
            image: { type: 'fa-icon', name: 'id-badge' },
        };
    }
}

export const AttributeProofType = new AssetType(
    Schema,
    (id, props, isInitial) => new AttributeProof(id, props, isInitial),
);
