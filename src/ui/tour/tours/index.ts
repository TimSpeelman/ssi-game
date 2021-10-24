import { Tour } from '../Tour';
import { FullTour } from './FullTour';
import { ViewersTour } from './ViewersTour';

export const tours: Record<string, Tour> = {
    full: FullTour,
    view: ViewersTour,
};
