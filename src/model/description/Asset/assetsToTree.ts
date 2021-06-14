import { AssetDesc } from './AssetDesc';
import { AssetTreeNode } from './AssetTreeNode';

export function assetsToTree(assets: AssetDesc[]): { trees: AssetTreeNode[]; record: Record<string, AssetTreeNode> } {
    const record: Record<string, AssetTreeNode> = {};
    const nodes = assets.map((a) => ({ asset: a, children: [] }));
    nodes.forEach((node) => {
        record[node.asset.id] = node;
    });
    nodes.forEach((node) => {
        if (node.asset.parentId) {
            record[node.asset.parentId].children.push(node);
        }
    });
    const roots = Object.values(record).filter((node) => !node.asset.parentId);
    console.log('ATT', roots);
    return { trees: roots, record };
}
