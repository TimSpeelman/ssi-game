import { Button, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { ChevronLeft, Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../config/actorImage';
import { Asset } from '../../../content/assets/Asset';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectScenarioConfiguration, selectSelectedActor } from '../../../state/scenario/selectors';
import { ucFirst } from '../../../util/util';
import { ActorDefinitionDialog } from './ActorConfigDialog';

/** Shows the details of a scenario step */
export function ActorInspector() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const actorState = useSelector(selectSelectedActor)!;
    const { assets } = actorState;
    const config = useSelector(selectScenarioConfiguration);
    const { actors } = config;
    const actorConfig = actors.find((a) => a.definition.id === actorState?.actor.id);
    const { definition } = actorConfig!;
    return (
        <div>
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
                <Typography variant="h6">Geselecteerde Actor: {definition.name}</Typography>
            </div>

            <img src={actorImage(definition.type.image)} style={{ height: '6rem' }} />

            <Button variant={'outlined'} onClick={() => setEditing(true)}>
                <Edit /> Bewerken
            </Button>

            <Typography variant="h6">Assets</Typography>
            <List dense>
                {assets.length > 0 ? (
                    assets.map((a, i) => (
                        <ListItem key={i}>
                            <ListItemText primary={ucFirst(a.type)} secondary={assetFieldsToString(a)} />
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

function assetToString(a: Asset) {
    const keys = Object.keys(a);
    return `<${ucFirst(a.type)} ${keys
        .filter((k) => k !== 'kind' && k !== 'type')
        // @ts-ignore
        .map((k) => `${k}:${a[k]}`)
        .join(' ')}>`;
}

function assetFieldsToString(a: Asset) {
    const keys = Object.keys(a);
    return (
        keys
            .filter((k) => k !== 'kind' && k !== 'type')
            // @ts-ignore
            .map((k) => `${k}:${a[k]}`)
            .join(' | ')
    );
}

function getFirstKVPair(a: Asset) {
    const keys = Object.keys(a);
    return (
        keys
            .filter((k) => k !== 'kind' && k !== 'type' && k !== 'id')
            .slice(0, 1)
            // @ts-ignore
            .map((k) => `${k}:${a[k]}`)
            .join('')
    );
}
