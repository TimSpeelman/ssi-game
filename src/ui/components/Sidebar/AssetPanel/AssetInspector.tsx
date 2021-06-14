import { Button, Divider, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectSelectedAssetNode, selectUsedActors } from '../../../../state/scenario/selectors';
import { SidebarTab } from '../SidebarTab';
import { AssetList } from './AssetList';

export function AssetInspector() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);

    const asset: AssetTreeNode | undefined = useSelector(selectSelectedAssetNode);
    const actors = useSelector(selectUsedActors);
    const actor = actors.find((a) => a.id === asset?.ownerId);

    function handleAssetClick(id: string) {
        dispatch(ScenarioActions.SELECT_ASSET({ id }));
    }

    function backToOwner() {
        dispatch(ScenarioActions.SELECT_ACTOR({ id: actor!.id }));
        dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
    }

    return !asset ? (
        <div>Geen asset geselecteerd</div>
    ) : (
        <div>
            <Button onClick={backToOwner}>
                <ChevronLeft /> Assets van {actor!.name}
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

            {asset.asset.canHaveChildren && (
                <Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Typography variant="h6">Inhoud ({asset.children.length})</Typography>
                        <Button onClick={() => setAdding(true)}>
                            <Add /> Toevoegen
                        </Button>
                    </div>
                    <AssetList
                        assets={asset.children}
                        onEdit={() => undefined}
                        onDelete={() => undefined}
                        onClick={handleAssetClick}
                    />
                </Fragment>
            )}
        </div>
    );
}
