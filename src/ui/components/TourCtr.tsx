import React, { Fragment, useEffect } from 'react';
import { useChildMeasurements } from '../hooks/useHighlights';
import { Tour } from '../tour/Tour';
import { useTour } from '../tour/useTour';
import { HighlightCover } from './HighlightCover';
import { TourMessage } from './TourMessage';

export interface Props {
    tour: Tour;
}

export function TourCtr(props: Props) {
    const tour = useTour(props.tour);
    const childRect = useChildMeasurements({ current: document.body }, tour.step?.highlight?.q);

    useEffect(() => tour.next(), []);

    return (
        <Fragment>
            {tour.step && (
                <TourMessage
                    index={tour.index}
                    highestIndex={tour.highestIndex}
                    step={tour.step}
                    numberOfSteps={tour.numberOfSteps}
                    onNext={tour.next}
                    onPrev={tour.prev}
                    onClose={tour.close}
                />
            )}
            <HighlightCover on={!!childRect} rect={childRect} expand={tour.step?.highlight?.expand} />
        </Fragment>
    );
}
