import { AttributeKnowledge } from './abc/AttributeKnowledge';
import { AttributeProof } from './abc/AttributeProof';
import { FaceScan } from './feature/FaceScan';
import { FingerprintScan } from './feature/FingerprintScan';

/** The DataAsset union type describes any kind of data (or knowledge) that an Actor possesses. */
export type DataAsset = FaceScan | FingerprintScan | AttributeKnowledge | AttributeProof;
