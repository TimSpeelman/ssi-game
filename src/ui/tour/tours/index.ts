import { Tour } from '../Tour';
import { BuildersTour } from './BuildersTour';
import { ViewersTour } from './ViewersTour';

export const tours: Record<string, Tour> = {
    intro: ViewersTour,
    build: BuildersTour,
};
