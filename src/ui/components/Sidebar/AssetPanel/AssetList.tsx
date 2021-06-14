import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';

export interface Props {
    assets: AssetTreeNode[];
    isInitial: (id: string) => boolean;
    onClick: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AssetList({ assets, isInitial, onEdit, onDelete, onClick }: Props) {
    return (
        <List dense>
            {assets.length > 0 ? (
                assets.map((a, i) => (
                    <ListItem key={i} onClick={() => onClick(a.asset.id)}>
                        <ListItemText primary={a.asset.title} secondary={`(${a.children.length}) ` + a.asset.sub} />
                        {isInitial(a.asset.id) && (
                            <Button onClick={() => onEdit(a.asset.id)}>
                                <Edit />
                            </Button>
                        )}
                        {isInitial(a.asset.id) && (
                            <Button onClick={() => onDelete(a.asset.id)}>
                                <Delete />
                            </Button>
                        )}
                    </ListItem>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary={'- geen -'} />
                </ListItem>
            )}
        </List>
    );
}
