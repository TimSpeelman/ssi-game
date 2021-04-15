import { AttributeKnowledge } from './abc/AttributeKnowledge';
import { AttributeProof } from './abc/AttributeProof';
import { AuthenticationResult } from './abc/AuthenticationResult';
import { HumanRecord } from './abc/HumanRecord';
import { PrivKey } from './cryptography/PrivKey';
import { PubKey } from './cryptography/PubKey';
import { FacePortrait } from './feature/FaceScan';
import { FingerprintScan } from './feature/FingerprintScan';

/** The DataAsset union type describes any kind of data (or knowledge) that an Actor possesses. */
export type DataAsset =
    | FacePortrait
    | FingerprintScan
    | AttributeKnowledge
    | AttributeProof
    | HumanRecord
    | AuthenticationResult
    | PubKey
    | PrivKey;
