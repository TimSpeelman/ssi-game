import { ActorField } from './ActorField';
import { AssetField } from './AssetField';
import { ImageSelectField } from './ImageSelectField';
import { StringField } from './StringField';

export type Field = StringField | AssetField | ActorField | ImageSelectField;
