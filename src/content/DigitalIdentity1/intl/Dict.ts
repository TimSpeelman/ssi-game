/** Content Specific Dictionary */
export interface Dictionary {
    issuer: string;
    verifier: string;
    subject: string;
    attribute: string;
    attributeName: string;
    attributeValue: string;
    pseudonym: string;
    issuerPseudonym: string;
    subjectPseudonym: string;
    subjectPassport: string;
    verifierPseudonym: string;
    fromActor: string;
    toActor: string;
    description: string;

    name: string;
    firstName: string;
    dateOfBirth: string;
    placeOfIssuance: string;
    placeOfBirth: string;
    dateOfIssuance: string;
    dateOfExpiry: string;
    height: string;
    documentNumber: string;
    nationality: string;
    identifier: string;
}
