import { FaceFeature } from './FaceFeature';
import { FingerprintFeature } from './FingerprintFeature';

/** The FeatureAsset union type describes any kind of inherent (non-transferrable) feature or trait that an Actor has. */
export type FeatureAsset = FaceFeature | FingerprintFeature;
