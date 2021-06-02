import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedActor } from '../../../../state/scenario/selectors';
import { ActorInspector } from './ActorInspector';
import { ActorList } from './ActorList';

export function ActorPanel() {
    const selectedActor = useSelector(selectSelectedActor);

    return (
        <div style={{ padding: '1rem' }}>
            {selectedActor && <ActorInspector />}
            {!selectedActor && <ActorList />}
        </div>
    );
}
