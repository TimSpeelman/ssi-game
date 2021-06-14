import { AssetDef } from '../../model/definition/Asset/AssetDef';
import { Asset } from '../../model/logic/Asset/Asset';
import { AttributeKnowledge } from './data/abc/AttributeKnowledge';
import { AttributeProof } from './data/abc/AttributeProof';
import { AttributeRequest } from './data/abc/AttributeRequest';
import { AuthenticationResult } from './data/abc/AuthenticationResult';
import { Consent } from './data/abc/Consent';
import { HumanRecord } from './data/abc/HumanRecord';
import { FaceScan } from './data/feature/FaceScan';
import { FaceFeature } from './feature/FaceFeature';
import { FingerprintFeature } from './feature/FingerprintFeature';
import { GreenFlag } from './GreenFlag';
import { GovPassport } from './physical/GovPassport';
import { PUF } from './physical/PUF';
import { Wallet } from './software/Wallet';

export const Assets = {
    GreenFlag,
    AttributeKnowledge,
    AttributeProof,
    AttributeRequest,
    AuthenticationResult,
    Consent,
    HumanRecord,
    FaceScan,
    FaceFeature,
    FingerprintFeature,
    GovPassport,
    Wallet,
    PUF,
};

export function deserialize(s: AssetDef<any>): Asset<any> {
    if (!(s.typeName in Assets)) {
        throw new Error(`Asset with type ${s.typeName} unknown.`);
    }
    // @ts-ignore
    const constructor: any = Assets[s.typeName];
    return new constructor(s.id, s.props, true);
}
