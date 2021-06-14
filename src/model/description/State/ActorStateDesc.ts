import { Actor } from '../../definition/Actor/Actor';
import { AssetTreeNode } from '../Asset/AssetTreeNode';

export interface ActorStateDesc {
    assetTrees: AssetTreeNode[];
    assetsById: Record<string, AssetTreeNode>;
    actor: Actor;
    mode?: string;
}
