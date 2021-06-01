/**
 * Attribute Proof is equivalent to Attribute Knowledge, except it enables the possessing Actor to prove it.
 * - Note: a proof could be decomposed into other data elements, but this simplification is made for ease of play.
 */
export interface AttributeProof {
    kind: 'data';
    type: 'attribute-proof';
    id: string;
    name: string;
    value: string;
    issuerId: string;
    subjectId: string;
}
