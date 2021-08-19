import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../state/actions';
import { RootState } from '../../state/state';
import { TourStep, TourStepState } from './TourStep';

export function useTour(tour: TourStep[]) {
    const state = useSelector((s) => s) as RootState;
    const dispatch = useDispatch();

    const [index, setIndex] = useState(-1);
    const numberOfSteps = tour.length;
    const step = tour[index];

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
        const step = tour[index];

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

    const stepState: TourStepState = step && {
        title: typeof step.title === 'function' ? step.title(ctx.state) : step.title,
        message: typeof step.message === 'function' ? step.message(ctx.state) : step.message,
        nextEnabled: typeof step.nextEnabled === 'function' ? step.nextEnabled(ctx.state) : step.nextEnabled,
        highlight: typeof step.highlight === 'function' ? step.highlight(ctx.state) : step.highlight,
    };

    return { step: stepState, next, prev, close, index, numberOfSteps };
}
