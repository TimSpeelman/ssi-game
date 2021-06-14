import { Button, Divider, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectSelectedAssetNode } from '../../../../state/scenario/selectors';
import { AssetList } from './AssetList';

export function AssetInspector() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);

    const actorName = 'X';
    const asset: AssetTreeNode | undefined = useSelector(selectSelectedAssetNode);
    const assets: AssetTreeNode[] = [];

    function handleAssetClick(id: string) {
        dispatch(ScenarioActions.SELECT_ASSET({ id }));
    }

    return !asset ? (
        <div>Geen asset geselecteerd</div>
    ) : (
        <div>
            <Button onClick={() => dispatch(ScenarioActions.CLEAR_SELECTION())}>
                <ChevronLeft /> Assets van {actorName}
            </Button>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">Geselecteerde Asset</Typography>
            </div>

            <div
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    padding: '1rem',
                    alignItems: 'center',
                    justifyContent: 'stretch',
                    background: '#eee',
                }}
            >
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{asset.asset.title}</Typography>
                    <Typography variant="subtitle2">{asset.asset.sub}</Typography>
                </div>
                <Button onClick={() => setEditing(true)}>
                    <Edit />
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">Assets ({assets.length})</Typography>
                <Button onClick={() => setAdding(true)}>
                    <Add /> Toevoegen
                </Button>
            </div>
            <AssetList
                assets={[]}
                isInitial={() => false}
                onEdit={() => undefined}
                onDelete={() => undefined}
                onClick={handleAssetClick}
            />
        </div>
    );
}
