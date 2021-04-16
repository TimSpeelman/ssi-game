import { Typography } from '@material-ui/core';
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
            <ul>
                {assets.length > 0 ? (
                    assets.map((a, i) => <li key={i}>{assetToString(a)}</li>)
                ) : (
                    <ul>
                        <li>
                            <small>- Geen -</small>
                        </li>
                    </ul>
                )}
            </ul>
        </div>
    );
}

function assetToString(a: Asset) {
    const keys = Object.keys(a);
    return `<${ucFirst(a.type)} ${keys
        .filter((k) => k !== 'kind' && k !== 'type')
        // @ts-ignore
        .map((k) => `${k}: ${a[k]}`)
        .join(' ')}>`;
}