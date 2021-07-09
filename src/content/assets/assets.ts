import { AssetTypesCollection } from '../../model/content/Asset/AssetTypesCollection';
import { AttributeKnowledgeType } from './data/abc/AttributeKnowledge';
import { AttributeProofType } from './data/abc/AttributeProof';
import { AttributeRequestType } from './data/abc/AttributeRequest';
import { AttributeRevocationType } from './data/abc/AttributeRevocation';
import { AuthenticationResultType } from './data/abc/AuthenticationResult';
import { ConsentType } from './data/abc/Consent';
import { HumanRecordType } from './data/abc/HumanRecord';
import { FaceScanType } from './data/feature/FaceScan';
import { FaceFeatureType } from './feature/FaceFeature';
import { FingerprintFeatureType } from './feature/FingerprintFeature';
import { GreenFlagType } from './GreenFlag';
import { GovPassportType } from './physical/GovPassport';
import { PUFType } from './physical/PUF';
import { WalletType } from './software/Wallet';

export const DefaultAssetsCollection = new AssetTypesCollection([
    GreenFlagType,
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
