import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedActor } from '../../../state/scenario/selectors';
import { ActorInspector } from './ActorInspector';

/** The InfoPanel describes the Scenario's Information */
export function ActorPanel() {
    const selectedActor = useSelector(selectSelectedActor);

    return (
        <div>
            {selectedActor && <ActorInspector actor={selectedActor.actor} assets={selectedActor.assets} />}
            {!selectedActor && 'Selecteer een actor'}
        </div>
    );
}
