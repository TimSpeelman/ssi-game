import { ContentLibrary } from '../../model/content/ContentLibrarty';
import { actionCollection } from './actions';
import { actorTypes } from './actors/actorTypes';
import { assetCollection } from './assets';
import { ContentLibraryDisplayScenario } from './scenarios/ContentLibraryDisplay';
import { OnlineLiquorPurchaseScenario } from './scenarios/OnlineLiquorPurchaseScenario';
import { TourScenario } from './scenarios/TourScenario';

export const DigitalIdentity1: ContentLibrary = {
    actions: actionCollection,
    assets: assetCollection,
    actors: actorTypes,
    scenarios: [ContentLibraryDisplayScenario, OnlineLiquorPurchaseScenario, TourScenario],
};
