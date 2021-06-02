import { AttributeKnowledge } from './abc/AttributeKnowledge';
import { AttributeProof } from './abc/AttributeProof';
import { AttributeRequest } from './abc/AttributeRequest';
import { AuthenticationResult } from './abc/AuthenticationResult';
import { Consent } from './abc/Consent';
import { HumanRecord } from './abc/HumanRecord';
import { FaceScan } from './feature/FaceScan';

/** The DataAsset union type describes any kind of data (or knowledge) that an Actor possesses. */
export type DataAsset =
    | FaceScan
    | AttributeKnowledge
    | AttributeProof
    | Consent
    | AttributeRequest
    | HumanRecord
    | AuthenticationResult;
