import React from 'react';
import { useDispatch } from 'react-redux';
import { ProjectActions } from '../../../state/project/actions';
import { StepDialog } from './StepDialog';

interface Props {
    options: AddStepDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export type AddStepDialogOptions = void;

export function AddStepDialogCtr(props: Props) {
    const dispatch = useDispatch();

    return (
        <StepDialog
            onSubmit={(step) => {
                dispatch(ProjectActions.ADD_STEP({ step }));
                props.onSubmit();
            }}
            onCancel={props.onCancel}
            isCreate={true}
        />
    );
}
