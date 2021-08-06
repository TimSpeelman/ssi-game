import { ActorDesc } from '../Actor/ActorDesc';
import { AssetTreeNode } from '../Asset/AssetTreeNode';

export interface ActorStateDesc {
    assetTrees: AssetTreeNode[];
    assetsById: Record<string, AssetTreeNode>;
    actor: ActorDesc;
    mode?: string;
}
