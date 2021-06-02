import { Assets } from './assets';

export const AssetForms = Object.values(Assets).map((c) => ({ ...c.config, typeName: c.name }));
