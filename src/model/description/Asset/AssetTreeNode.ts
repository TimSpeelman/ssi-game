import { AssetDesc } from './AssetDesc';

export interface AssetTreeNode {
    ownerId: string;
    asset: AssetDesc;
    children: AssetTreeNode[];
}
