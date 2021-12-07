import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../state/actions';
import { RootState } from '../../state/state';
import { Tour } from './Tour';
import { IndexType, TourStep, TourStepState } from './TourStep';

export function useTour(tour: Tour) {
    const state = useSelector((s) => s) as RootState;
    const dispatch = useDispatch();

    const [index, setIndex] = useState(-1);
    const steps = tour.steps;
    const { indices, highestIndex } = getVisibleIndices(steps);

    const numberOfSteps = steps.length;
    const step = steps[index];

    // When the user presses PREVIOUS, we simply reset the entire state.
    const [history, setHistory] = useState<RootState[]>([]);

    function saveStepPreState(index: number, preState: RootState) {
        setHistory((h) => [...h.slice(0, index), preState]);
    }

    function resetStepPreState(index: number) {
        dispatch(GameActions.SET_GAME_STATE({ state: history[index].scenario }));
    }

    // To prevent triggering the onStateChange event handler when transitioning
    // between steps, we keep track of the transitioning state.
    const [transitioning, setTransitioning] = useState(false);

    function enter(index: number) {
        setTransitioning(true);

        setIndex(index);
        const step = steps[index];

        saveStepPreState(index, state);

        step.onActivate && step.onActivate(ctx);

        setTransitioning(false);
    }

    function next() {
        setTransitioning(true);

        if (step && step.beforeNext) step.beforeNext(ctx);
        enter(Math.min(numberOfSteps, index + 1));
    }

    function prev() {
        setTransitioning(true);

        const newIndex = Math.max(0, index - 1);
        resetStepPreState(newIndex);
        enter(newIndex);
    }

    /** Re-invoke the step's onActivate method (useful for preventing/blocking certain actions) */
    function reactivate() {
        setTransitioning(true);

        step.onActivate && step.onActivate(ctx);

        setTransitioning(false);
    }

    const close = () => setIndex(-1);

    const ctx = { state, dispatch, next, prev, reactivate };

    useEffect(() => {
        if (step && !transitioning && step.onStateChange) {
            step.onStateChange(ctx);
        }
    }, [state]);

    const computeStep = step && (step.step instanceof Function ? step.step : () => step.step as TourStepState);
    const stepState: TourStepState = computeStep && { ...computeStep(ctx.state), index: indices[index] };

    return { step: stepState, next, prev, close, index, numberOfSteps, highestIndex };
}

/** Some tour steps have the same visible index, or have no index */
function getVisibleIndices(steps: TourStep[]): { indices: (number | undefined)[]; highestIndex: number } {
    let i = -1;
    const indices = steps.map((s) => {
        switch (s.indexType) {
            case IndexType.NONE:
                return undefined;
            case IndexType.SAME_AS_PREVIOUS:
                return i;
            default:
                return ++i;
        }
    });
    return { indices, highestIndex: i };
}
