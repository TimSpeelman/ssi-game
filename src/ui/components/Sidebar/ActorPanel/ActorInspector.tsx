import { Button, Divider, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectScenarioDef, selectSelectedActorDesc } from '../../../../state/scenario/selectors';
import { AssetList } from '../AssetPanel/AssetList';
import { SidebarTab } from '../SidebarTab';
import { ActorDefinitionDialog } from './ActorConfigDialog';
import { AssetDialog } from './AssetDialog';

/** Shows the details of a scenario step */
export function ActorInspector() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editedAsset, setEditAsset] = useState<string | undefined>(undefined);
    const actorState = useSelector(selectSelectedActorDesc)!;
    const { assetTrees: assets } = actorState;
    const scenarioDef = useSelector(selectScenarioDef);
    const { actors } = scenarioDef;
    const actorConfig = actors.find((a) => a.definition.id === actorState?.actor.id);
    const { definition, initialAssets } = actorConfig!;

    return (
        <div>
            <AssetDialog
                open={adding}
                isCreate={true}
                onSubmit={(asset) => {
                    dispatch(ScenarioActions.ADD_ASSET({ actorId: definition.id, asset }));
                    setAdding(false);
                }}
                onCancel={() => setAdding(false)}
            />
            <AssetDialog
                open={!!editedAsset}
                asset={initialAssets.find((a) => a.id === editedAsset)}
                isCreate={false}
                onSubmit={(asset) => {
                    dispatch(ScenarioActions.UPDATE_ASSET({ actorId: definition.id, asset }));
                    setEditAsset(undefined);
                }}
                onCancel={() => setEditAsset(undefined)}
            />
            <ActorDefinitionDialog
                isCreate={false}
                open={editing}
                definition={definition}
                handleClose={() => setEditing(false)}
                handleSubmit={(newActor) => {
                    dispatch(ScenarioActions.UPDATE_ACTOR_DEFINITION({ def: newActor }));
                    setEditing(false);
                }}
            />
            <Button onClick={() => dispatch(ScenarioActions.CLEAR_SELECTION())}>
                <ChevronLeft /> Alle Actoren
            </Button>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">Geselecteerde Actor</Typography>
            </div>

            <div
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    alignItems: 'center',
                    justifyContent: 'stretch',
                    background: '#eee',
                }}
            >
                <img src={actorImage(definition.type.image)} style={{ height: '6rem' }} />
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{definition.name}</Typography>
                    <Typography variant="subtitle2">{definition.description}</Typography>
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
                assets={assets}
                onEdit={setEditAsset}
                onDelete={(id) => dispatch(ScenarioActions.REMOVE_ASSET({ actorId: definition.id, id: id }))}
                onClick={(id) => {
                    dispatch(ScenarioActions.SELECT_ASSET({ id: id }));
                    dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS }));
                }}
            />
        </div>
    );
}
