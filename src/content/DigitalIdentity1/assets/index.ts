import { AssetTypesCollection } from '../../../model/content/Asset/AssetTypesCollection';
import { AttributeKnowledgeType } from './AttributeKnowledge';
import { AttributeRequestType } from './AttributeRequest';
import { AttributeRevocationType } from './AttributeRevocation';
import { AuthenticationResultType } from './AuthenticationResult';
import { ConsentType } from './Consent';
import { CredentialType } from './Credential';
import { GovPassportType } from './GovPassport';
import { GreenFlagType } from './GreenFlag';
import { HumanRecordType } from './HumanRecord';
import { PseudonymType } from './Pseudonym';
import { PUFType } from './PUF';
import { WalletType } from './Wallet';

export const assetCollection = new AssetTypesCollection([
    GreenFlagType,
    PseudonymType,
    AttributeKnowledgeType,
    CredentialType,
    AttributeRequestType,
    AttributeRevocationType,

    AuthenticationResultType,
    ConsentType,
    HumanRecordType,
    GovPassportType,
    WalletType,
    PUFType,
]);
