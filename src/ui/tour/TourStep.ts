import { Dispatch } from 'react';
import { Translation } from '../../intl/Language';
import { RootState } from '../../state/state';

export type TOrStateToT<T> = T | ((s: RootState) => T);

export interface TourStep {
    title: TOrStateToT<Translation>;

    message: TOrStateToT<Translation>;

    nextEnabled: TOrStateToT<boolean>;

    highlight?: TOrStateToT<{ q: string; expand?: number }>;

    /** Event handler when the step activates */
    onActivate?: (ctx: Context) => void;
    /** Event handler that fires when the state changes */
    onStateChange?: (ctx: Context) => void;
    /** Event handler that fires when the user navigates to the previous step */
    beforePrev?: (ctx: Context) => void;
    /** Event handler that fires when the user navigates to the next step */
    beforeNext?: (ctx: Context) => void;
}

export interface TourStepState {
    title: Translation;

    message: Translation;

    nextEnabled: boolean;

    highlight?: { q: string; expand?: number };
}

export interface Context {
    dispatch: Dispatch<any>;
    state: RootState;
    next: () => void;
    prev: () => void;
}
