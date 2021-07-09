import { Translation } from '../../../../intl/Language';
import { AssetDesc } from '../../../description/Asset/AssetDesc';

export interface AssetField {
    type: 'asset';
    title: Translation;
    options: AssetDesc[];
    value: string;
    disabled?: Translation;
}
