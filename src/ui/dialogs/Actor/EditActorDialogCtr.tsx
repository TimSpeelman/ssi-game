import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectActorDefById } from '../../../state/scenario/selectors';
import { ActorDefinitionDialog } from './ActorDefinitionDialog';

interface Props {
    options: EditActorDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export interface EditActorDialogOptions {
    actorId: string;
}

export function EditActorDialogCtr(props: Props) {
    const dispatch = useDispatch();
    const selector = selectActorDefById(props.options.actorId);
    const actor = useSelector(selector);
    const { definition, initialAssets } = actor!;

    return (
        <ActorDefinitionDialog
            isCreate={false}
            definition={definition}
            handleClose={props.onCancel}
            handleSubmit={(actor) => {
                dispatch(ScenarioActions.UPDATE_ACTOR_DEFINITION({ def: actor }));
                props.onSubmit();
            }}
        />
    );
}
