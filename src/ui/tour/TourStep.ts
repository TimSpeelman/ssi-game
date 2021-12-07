import { Dispatch } from 'react';
import { Translation } from '../../intl/Language';
import { RootState } from '../../state/state';

export type TOrStateToT<T> = T | ((s: RootState) => T);

export interface TourStep {
    /** Defaults to NEW_INDEX */
    indexType?: IndexType;
    /** Compute the step state */
    step: TOrStateToT<Omit<TourStepState, 'index'>>;
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

    status?: StatusType;

    /** The visible step index */
    index: number | undefined;
}

export interface Context {
    dispatch: Dispatch<any>;
    state: RootState;
    next: () => void;
    prev: () => void;
    /** Re-invoke the step's onActivate method (useful for preventing/blocking certain actions) */
    reactivate: () => void;
}

export enum IndexType {
    /** The TourStep has no number */
    NONE,
    /** The TourStap has a new number */
    NEW_INDEX,
    /** The TourStep has the same number as the previous step */
    SAME_AS_PREVIOUS,
}

export enum StatusType {
    NORMAL,
    /** The TourStep shows a warning */
    WARNING,
    /** The TourStep shows success */
    SUCCESS,
}
