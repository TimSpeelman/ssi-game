import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/state';
import { TourStep, TourStepState } from './TourStep';

export function useTour(tour: TourStep[]) {
    const state = useSelector((s) => s) as RootState;
    const dispatch = useDispatch();

    const [index, setIndex] = useState(-1);
    const numberOfSteps = tour.length;
    const step = tour[index];

    const next = () => setIndex((i) => Math.min(numberOfSteps, i + 1));
    const prev = () => setIndex((i) => Math.max(0, i - 1));

    const ctx = { state, dispatch, next, prev };

    useEffect(() => {
        if (step) {
            step.onActivate && step.onActivate(ctx);
        }
    }, [index]);

    useEffect(() => {
        if (step && step.onStateChange) {
            step.onStateChange(ctx);
        }
    }, [state]);

    const stepState: TourStepState = step && {
        title: typeof step.title === 'function' ? step.title(ctx.state) : step.title,
        message: typeof step.message === 'function' ? step.message(ctx.state) : step.message,
        nextEnabled: typeof step.nextEnabled === 'function' ? step.nextEnabled(ctx.state) : step.nextEnabled,
        highlight: typeof step.highlight === 'function' ? step.highlight(ctx.state) : step.highlight,
    };

    return { step: stepState, next, prev, index, numberOfSteps };
}
