import { DataAsset } from './data/DataAsset';
import { FeatureAsset } from './feature/FeatureAsset';
import { PhysicalAsset } from './physical/PhysicalAsset';

/**
 * The Asset union type describes any piece of data, hardware, or inheritance feature that an Actor may possess. We visualize the
 * creation, storage and exchange of assets to demonstrate the workings of identity systems and (the decay of) privacy.
 */
export type Asset = DataAsset | FeatureAsset | PhysicalAsset;
