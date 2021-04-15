import { DataAsset } from './data/DataAsset';
import { FeatureAsset } from './feature/FeatureAsset';
import { HardwareAsset } from './hardware/HardwareAsset';

/**
 * The Asset union type describes any piece of data, hardware, or inheritance feature that an Actor may possess. We visualize the
 * creation, storage and exchange of assets to demonstrate the workings of identity systems and (the decay of) privacy.
 *
 * For Encryption and Signatures:
 * - private and public keys
 * - generic: signature, hash, cipher text
 * - PKI certificate
 *
 * For Authentication:
 * - password / PIN code
 * - hardware token / chip
 *
 * For Attribute Based Credentials:
 * - credential
 */
export type Asset = DataAsset | FeatureAsset | HardwareAsset;
