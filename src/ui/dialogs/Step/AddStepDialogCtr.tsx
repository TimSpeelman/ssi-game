import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../../state/project/actions';
import { selectActiveStepIndex } from '../../../state/selectors';
import { StepDialog } from './StepDialog';

interface Props {
    options: AddStepDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export type AddStepDialogOptions = void;

export function AddStepDialogCtr(props: Props) {
    const dispatch = useDispatch();
    const index = useSelector(selectActiveStepIndex) + 1;

    return (
        <StepDialog
            onSubmit={(step) => {
                dispatch(ProjectActions.ADD_STEP({ step, afterIndex: index }));
                props.onSubmit();
            }}
            onCancel={props.onCancel}
            isCreate={true}
        />
    );
}
