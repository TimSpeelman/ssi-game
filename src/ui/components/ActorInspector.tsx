import React from 'react';
import { actorImage } from '../../config/actorImage';
import { Actor } from '../../data/actor/Actor';
import { Asset } from '../../data/asset/Asset';

interface Props {
    actor: Actor;
    assets: Asset[];
}

/** Shows the details of a scenario step */
export function ActorInspector({ actor, assets }: Props) {
    return (
        <div>
            <h1>Geselecteerde Actor: {actor.name}</h1>
            <img src={actorImage(actor.image)} style={{ height: '6rem' }} />

            <h2>Assets</h2>
            <ul>
                {assets.length > 0 ? (
                    assets.map((a, i) => <li key={i}>{JSON.stringify(a)}</li>)
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
