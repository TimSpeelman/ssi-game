import { AssetTypesCollection } from '../../../model/content/Asset/AssetTypesCollection';
import { AttributeKnowledgeType } from './AttributeKnowledge';
import { AttributeProofType } from './AttributeProof';
import { AttributeRequestType } from './AttributeRequest';
import { AttributeRevocationType } from './AttributeRevocation';
import { AuthenticationResultType } from './AuthenticationResult';
import { ConsentType } from './Consent';
import { FaceFeatureType } from './FaceFeature';
import { FaceScanType } from './FaceScan';
import { FingerprintFeatureType } from './FingerprintFeature';
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
    AttributeProofType,
    AttributeRequestType,
    AttributeRevocationType,

    AuthenticationResultType,
    ConsentType,
    HumanRecordType,
    FaceScanType,
    FaceFeatureType,
    FingerprintFeatureType,
    GovPassportType,
    WalletType,
    PUFType,
]);
