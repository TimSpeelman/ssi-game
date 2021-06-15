import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';
import { stopPropagation } from '../../../../util/util';
import { useLang } from '../../../hooks/useLang';

export interface Props {
    assets: AssetTreeNode[];
    onClick: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AssetList({ assets, onEdit, onDelete, onClick }: Props) {
    const { dict } = useLang();
    const title = (a: AssetTreeNode) =>
        a.asset.canHaveChildren ? `${a.asset.title} (${a.children.length})` : a.asset.title;
    return (
        <List dense>
            {assets.length > 0 ? (
                assets.map((a, i) => (
                    <ListItem key={i} onClick={() => onClick(a.asset.id)} button>
                        <ListItemText primary={title(a)} secondary={''} />
                        {a.asset.isInitial && (
                            <Button onClick={stopPropagation<any>(() => onEdit(a.asset.id))}>
                                <Edit />
                            </Button>
                        )}
                        {a.asset.isInitial && (
                            <Button onClick={stopPropagation<any>(() => onDelete(a.asset.id))}>
                                <Delete />
                            </Button>
                        )}
                    </ListItem>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary={`- ${dict.emptyListIndicator} -`} />
                </ListItem>
            )}
        </List>
    );
}
