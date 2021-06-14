import { Actor } from '../../definition/Actor/Actor';
import { AssetTreeNode } from '../Asset/AssetTreeNode';

export interface ActorStateDesc {
    assets: AssetTreeNode[];
    actor: Actor;
    mode?: string;
}
