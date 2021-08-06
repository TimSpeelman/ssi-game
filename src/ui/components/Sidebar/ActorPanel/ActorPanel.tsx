import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedActorDesc } from '../../../../state/selectors';
import { ActorInspector } from './ActorInspector';
import { ActorList } from './ActorList';

export function ActorPanel() {
    const selectedActor = useSelector(selectSelectedActorDesc);

    return (
        <div style={{ padding: '1rem' }}>
            {selectedActor && <ActorInspector />}
            {!selectedActor && <ActorList />}
        </div>
    );
}
