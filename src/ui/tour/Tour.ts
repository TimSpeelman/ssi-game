import { Translation } from '../../intl/Language';
import { TourStep } from './TourStep';

export interface Tour {
    title: Translation;
    steps: TourStep[];
}
