import { Button, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectScenarioDef, selectSelectedActorDesc } from '../../../../state/scenario/selectors';
import { ActorDefinitionDialog } from './ActorConfigDialog';
import { AssetDialog } from './AssetDialog';

/** Shows the details of a scenario step */
export function ActorInspector() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editedAsset, setEditAsset] = useState<string | undefined>(undefined);
    const actorState = useSelector(selectSelectedActorDesc)!;
    const { assets } = actorState;
    const scenarioDef = useSelector(selectScenarioDef);
    const { actors } = scenarioDef;
    const actorConfig = actors.find((a) => a.definition.id === actorState?.actor.id);
    const { definition, initialAssets } = actorConfig!;
    const isInitial = (id: string) => !!initialAssets.find((a) => a.id === id);
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
            <List dense>
                {assets.length > 0 ? (
                    assets.map((a, i) => (
                        <ListItem key={i}>
                            <ListItemText primary={a.title} secondary={a.sub} />
                            {isInitial(a.id) && (
                                <Button onClick={() => setEditAsset(a.id)}>
                                    <Edit />
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
        </div>
    );
}
