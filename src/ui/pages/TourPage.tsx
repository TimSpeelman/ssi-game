import React, { Fragment } from 'react';
import { NetworkViewerCtr } from '../components/NetworkViewerCtr';
import { TourCtr } from '../components/TourCtr';

export function TourPage() {
    return (
        <Fragment>
            <TourCtr />
            <NetworkViewerCtr />
        </Fragment>
    );
}
