import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';
import { GameActions } from '../../../../state/actions';
import { selectEditing, selectHighlightedResource, selectIsInitialState } from '../../../../state/selectors';
import { stopPropagation } from '../../../../util/util';
import { useLang } from '../../../hooks/useLang';

export interface Props {
    assets: AssetTreeNode[];
    onClick: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AssetList({ assets, onEdit, onDelete, onClick }: Props) {
    const { dict, lang } = useLang();
    const title = (a: AssetTreeNode) =>
        a.asset.canHaveChildren ? `${a.asset.title[lang]} (${a.children.length})` : a.asset.title[lang];
    const sub = (a: AssetTreeNode) => (!!a.asset.sub ? a.asset.sub[lang] : '');

    const dispatch = useDispatch();
    const isInitialState = useSelector(selectIsInitialState);
    const editing = useSelector(selectEditing);

    const highlightedResource = useSelector(selectHighlightedResource);
    const onMouseEnter = (id: string) => dispatch(GameActions.HIGHLIGHT_RESOURCE({ resourceId: id }));
    const onMouseLeave = (id: string) => dispatch(GameActions.UNHIGHLIGHT_RESOURCE({ resourceId: id }));

    return (
        <List dense>
            {assets.length > 0 ? (
                assets.map((a, i) => (
                    <ListItem
                        key={i}
                        onClick={() => onClick(a.asset.id)}
                        button
                        selected={highlightedResource === a.asset.id}
                        onMouseEnter={() => onMouseEnter(a.asset.id)}
                        onMouseLeave={() => onMouseLeave(a.asset.id)}
                    >
                        <ListItemText primary={title(a)} secondary={sub(a)} />
                        {editing && a.asset.isInitial && isInitialState && (
                            <Button onClick={stopPropagation<any>(() => onEdit(a.asset.id))}>
                                <Edit />
                            </Button>
                        )}
                        {editing && a.asset.isInitial && isInitialState && (
                            <Button onClick={stopPropagation<any>(() => onDelete(a.asset.id))}>
                                <Delete />
                            </Button>
                        )}
                    </ListItem>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary={`- ${dict.misc.emptyListIndicator} -`} />
                </ListItem>
            )}
        </List>
    );
}
