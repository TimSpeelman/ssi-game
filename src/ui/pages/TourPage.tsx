import React from 'react';
import { HotKeysContainer } from '../components/HotKeysContainer';
import { NetworkViewerCtr } from '../components/NetworkViewerCtr';
import { TourCtr } from '../components/TourCtr';
import { tours } from '../tour/tours';

export function TourPage(props: { tourId: string | undefined }) {
    const tour = tours[props.tourId || ''];

    if (!tour) {
        return <div>Deze pagina bestaat niet.</div>;
    }

    return (
        <HotKeysContainer>
            <TourCtr tour={tour} />
            <NetworkViewerCtr tour={tour} />
        </HotKeysContainer>
    );
}
