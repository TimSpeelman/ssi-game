import { Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actorImage } from '../../../config/actorImage';
import { Asset } from '../../../content/assets/Asset';
import { Actor } from '../../../model/game/Actor';
import { ScenarioActions } from '../../../state/scenario/actions';
import { ucFirst } from '../../../util/util';

interface Props {
    actor: Actor;
    assets: Asset[];
}

/** Shows the details of a scenario step */
export function ActorInspector({ actor, assets }: Props) {
    const dispatch = useDispatch();
    return (
        <div>
            <Button onClick={() => dispatch(ScenarioActions.CLEAR_SELECTION())}>
                <ChevronLeft /> Alle Actoren
            </Button>
            <Typography variant="h6">Geselecteerde Actor: {actor.name}</Typography>
            <img src={actorImage(actor.image)} style={{ height: '6rem' }} />

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
