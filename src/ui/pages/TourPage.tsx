import React from 'react';
import { HotKeysContainer } from '../components/HotKeysContainer';
import { NetworkViewerCtr } from '../components/NetworkViewerCtr';
import { TourCtr } from '../components/TourCtr';

export function TourPage() {
    return (
        <HotKeysContainer>
            <TourCtr />
            <NetworkViewerCtr tour />
        </HotKeysContainer>
    );
}
