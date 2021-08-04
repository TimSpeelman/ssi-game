import { ActorEl } from './ActorEl';
import { AssetEl } from './AssetEl';
import { ConnectionEl } from './ConnectionEl';
import { PseudonymEl } from './PseudonymEl';
import { SlotEl } from './SlotEl';

export type CanvasElem = SlotEl | ActorEl | ConnectionEl | AssetEl | PseudonymEl;
