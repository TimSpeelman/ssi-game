import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../../state/project/actions';
import { selectActionDefById } from '../../../state/selectors';
import { StepDialog } from './StepDialog';

interface Props {
    options: EditStepDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export interface EditStepDialogOptions {
    stepId: string;
}

export function EditStepDialogCtr(props: Props) {
    const dispatch = useDispatch();
    const selector = selectActionDefById(props.options.stepId);
    const actionDef = useSelector(selector);

    return (
        <StepDialog
            action={actionDef!}
            onSubmit={(step) => {
                dispatch(ProjectActions.UPDATE_STEP({ step }));
                props.onSubmit();
            }}
            onCancel={props.onCancel}
            isCreate={false}
        />
    );
}
