import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../../state/project/actions';
import { selectScenarioMeta } from '../../../state/selectors';
import { EditScenarioMetaDialog } from './EditScenarioMetaDialog';

interface Props {
    options: void;
    onSubmit: () => void;
    onCancel: () => void;
}

export function EditScenarioMetaDialogCtr(props: Props) {
    const dispatch = useDispatch();
    const meta = useSelector(selectScenarioMeta);

    return (
        <EditScenarioMetaDialog
            meta={meta}
            onSubmit={(meta) => {
                dispatch(ProjectActions.UPDATE_META({ meta }));
                props.onSubmit();
            }}
            onCancel={props.onCancel}
        />
    );
}
