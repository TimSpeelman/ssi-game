import { ActorType } from '../definition/Actor/ActorType';
import { ScenarioDef } from '../definition/Scenario/ScenarioDef';
import { ActionTypesCollection } from './Action/ActionTypesCollection';
import { AssetTypesCollection } from './Asset/AssetTypesCollection';

export interface ContentLibrary {
    actions: ActionTypesCollection;
    assets: AssetTypesCollection;
    actors: Record<string, ActorType>;
    scenarios: ScenarioDef[];
}
