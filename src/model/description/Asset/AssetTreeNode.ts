import { AssetDesc } from './AssetDesc';

export interface AssetTreeNode {
    asset: AssetDesc;
    children: AssetTreeNode[];
}
