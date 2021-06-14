import { Button, Divider, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectScenarioDef, selectSelectedActorDesc } from '../../../../state/scenario/selectors';
import { useDialog } from '../../../dialogs/dialogs';
import { AssetList } from '../AssetPanel/AssetList';
import { SidebarTab } from '../SidebarTab';

/** Shows the details of a scenario step */
export function ActorInspector() {
    const dispatch = useDispatch();
    const actorState = useSelector(selectSelectedActorDesc)!;
    const { assetTrees: assets } = actorState;
    const scenarioDef = useSelector(selectScenarioDef);
    const { actors } = scenarioDef;
    const actorConfig = actors.find((a) => a.definition.id === actorState?.actor.id);
    const { definition, initialAssets } = actorConfig!;
    const { openDialog } = useDialog();

    return (
        <div>
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
                <Button onClick={() => openDialog('EditActor', { actorId: definition.id })}>
                    <Edit />
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">Assets ({assets.length})</Typography>
                <Button onClick={() => openDialog('AddAsset', { actorId: definition.id })}>
                    <Add /> Toevoegen
                </Button>
            </div>
            <AssetList
                assets={assets}
                onEdit={(id) => openDialog('EditAsset', { actorId: definition.id, assetId: id })}
                onDelete={(id) => dispatch(ScenarioActions.REMOVE_ASSET({ actorId: definition.id, id: id }))}
                onClick={(id) => {
                    dispatch(ScenarioActions.SELECT_ASSET({ id: id }));
                    dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS }));
                }}
            />
        </div>
    );
}
