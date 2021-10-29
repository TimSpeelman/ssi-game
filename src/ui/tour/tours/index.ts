import { Tour } from '../Tour';
import { BuildersTour } from './BuildersTour';
import { FullTour } from './FullTour';
import { ViewersTour } from './ViewersTour';

export const tours: Record<string, Tour> = {
    full: FullTour,
    intro: ViewersTour,
    build: BuildersTour,
};
