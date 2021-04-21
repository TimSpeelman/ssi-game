import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { actorImage } from '../../config/actorImage';
import { Actor } from '../../data/actor/Actor';
import { Asset } from '../../data/asset/Asset';
import { ucFirst } from '../../util/util';

interface Props {
    actor: Actor;
    assets: Asset[];
}

/** Shows the details of a scenario step */
export function ActorInspector({ actor, assets }: Props) {
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h5">Geselecteerde Actor: {actor.name}</Typography>
            <img src={actorImage(actor.image)} style={{ height: '6rem' }} />

            <Typography variant="h6">Assets</Typography>
            <List dense>
                {assets.length > 0 ? (
                    assets.map((a, i) => (
                        <ListItem key={i}>
                            {/* <Tooltip title={assetToString(a)}> */}
                            <ListItemText primary={ucFirst(a.type)} secondary={assetFieldsToString(a)} />
                            {/* <span>
                                    &lt;<strong>{ucFirst(a.type)}</strong> {getFirstKVPair(a)}&gt;
                                </span> */}
                            {/* </Tooltip> */}
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
