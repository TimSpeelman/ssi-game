import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ActorConfig } from '../../../model/definition/Actor/ActorConfig';
import { ProjectActions } from '../../../state/project/actions';
import { ActorDefinitionDialog } from './ActorDefinitionDialog';

interface Props {
    options: AddActorDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export type AddActorDialogOptions = void;

export function AddActorDialogCtr(props: Props) {
    const dispatch = useDispatch();

    return (
        <ActorDefinitionDialog
            isCreate={true}
            handleClose={props.onCancel}
            handleSubmit={(newActor) => {
                const id = uuid();
                const newActorConfig: ActorConfig = { initialAssets: [], definition: { ...newActor, id } };
                dispatch(ProjectActions.ADD_ACTOR({ actor: newActorConfig }));
                props.onSubmit();
            }}
        />
    );
}
