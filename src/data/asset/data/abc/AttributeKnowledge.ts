/** Attribute Knowledge means that the possessing Actor knows a particular attribute value of some subject */
export interface AttributeKnowledge {
    kind: 'data';
    type: 'attribute-knowledge';
    subjectId: string;
    name: string;
    value: string;
    issuerId: string;
}
