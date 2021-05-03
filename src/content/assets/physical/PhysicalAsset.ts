import { GovPassport } from './GovPassport';
import { PUF } from './PUF';

/** The PhysicalAsset union type describes any kind of physical object that an Actor possesses. */
export type PhysicalAsset = PUF | GovPassport;
