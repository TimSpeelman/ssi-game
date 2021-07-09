import React from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioActions } from '../../../state/scenario/actions';
import { StepDialog2 } from './StepDialog2';

interface Props {
    options: AddStepDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export type AddStepDialogOptions = void;

export function AddStepDialogCtr(props: Props) {
    const dispatch = useDispatch();

    return (
        <StepDialog2
            onSubmit={(step) => {
                dispatch(ScenarioActions.ADD_STEP({ step }));
                props.onSubmit();
            }}
            onCancel={props.onCancel}
            isCreate={true}
        />
    );
}
