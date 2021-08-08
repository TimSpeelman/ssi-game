import { uniLang } from '../../../intl/Language';
import { AssetSchema, TypeOfAssetSchema } from '../../../model/content/Asset/AssetSchema';
import { AssetType } from '../../../model/content/Asset/AssetType';
import { Asset, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { format } from '../../../util/util';
import { CommonProps } from '../common/props';
import { urlNym } from '../common/util';
import { Pseudonym } from './Pseudonym';

const Schema = new AssetSchema({
    typeName: 'Credential',
    kindName: 'Data',
    title: {
        NL: 'Attribuutbewijs',
        EN: 'Attribute proof',
    },
    image: { type: 'fa-icon', name: 'id-badge' },
    props: {
        subjectNym: CommonProps.anySubjectNym,
        issuerNym: CommonProps.anyIssuerNym,
        attributeName: CommonProps.attributeName,
        attributeValue: CommonProps.attributeValue,
    },
});

export type Props = TypeOfAssetSchema<typeof Schema>;

/**
 * Attribute Proof is equivalent to Attribute Knowledge, except it enables the possessing Actor to prove it.
 * - Note: a proof could be decomposed into other data elements, but this simplification is made for ease of play.
 */
export class Credential extends Asset<Props> {
    schema = Schema;

    _describe(state: ScenarioState): CustomAssetDesc {
        const { issuerNym, subjectNym, attributeName, attributeValue } = this.evaluateProps(state);
        const sNym: Pseudonym | undefined = subjectNym;
        const iNym: Pseudonym | undefined = issuerNym;
        const schemaProps = this.schema.props.props;
        const attributeLabel =
            this.defProps.attributeValue === '' || this.defProps.attributeValue === undefined
                ? this.defProps.attributeName
                : `${this.defProps.attributeName}: ${this.defProps.attributeValue}`;
        if (!sNym || !iNym) return {};

        return {
            title: {
                NL: 'Credential ' + this.defProps.attributeName,
                EN: 'Credential ' + this.defProps.attributeName,
            },
            sub: {
                NL: 'Uitgegeven door ' + iNym.defProps.identifier,
                EN: 'Issued by ' + iNym.defProps.identifier,
            },
            long: {
                NL: format(
                    //
                    (s) =>
                        `Dit credential stelt de houder van het ${s.subjectNym}` +
                        ` in staat te bewijzen dat hij het attribuut "${s.attribute}" heeft.` +
                        ` Het credential toont aan dat het is uitgegeven door de` +
                        ` houder van het ${s.issuerNym}.`,
                    {
                        subjectNym: urlNym(sNym).NL,
                        attribute: attributeLabel,
                        issuerNym: urlNym(iNym).NL,
                    },
                ),
                EN: format(
                    //
                    (s) =>
                        `This credential enables the holder of the ${s.subjectNym}` +
                        ` to prove that the attribute "${s.attribute}" applies to him/her.` +
                        ` The credential shows it was issued by the` +
                        ` holder of the ${s.issuerNym}.`,
                    {
                        subjectNym: urlNym(sNym).EN,
                        attribute: attributeLabel,
                        issuerNym: urlNym(iNym).EN,
                    },
                ),
            },
            transferrable: false,
            cloneable: true,
            propertyDesc: [
                { title: schemaProps.subjectNym.title, value: uniLang(sNym.defProps.identifier || '') },
                { title: schemaProps.issuerNym.title, value: uniLang(iNym.defProps.identifier || '') },
                { title: schemaProps.attributeName.title, value: uniLang(attributeName || '') },
                { title: schemaProps.attributeValue.title, value: uniLang(attributeValue || '') },
            ],
        };
    }
}

export const CredentialType = new AssetType(Schema, (id, props, isInitial) => new Credential(id, props, isInitial));
