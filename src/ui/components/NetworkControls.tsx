import React from 'react';
import { Interaction } from '../../data/action/Interaction';
import { Actor } from '../../data/actor/Actor';
import { ScenarioActions } from '../../data/scenario/actions';
import { IAction } from '../../util/redux';
import { ActivitySequence } from './ActivitySequence';
import { AddActivityMenu } from './AddActivityMenu';
import { AddActorMenu } from './AddActorMenu';

export interface Props {
    acts: Interaction[];
    onInspect: (act: Interaction) => void;
    dispatch: (action: IAction<any>) => void;
    availableActors: Actor[];
}

export function NetworkControls(props: Props) {
    return (
        <div style={{ margin: 20, padding: 20 }}>
            <AddActorMenu
                label={'Voeg actor toe'}
                actors={props.availableActors}
                onAdd={(actor) => props.dispatch(ScenarioActions.ADD_ACTOR({ actor }))}
            />

            <AddActivityMenu onAdd={(activity) => props.dispatch(ScenarioActions.ADD_ACTIVITY({ activity }))} />

            <ActivitySequence
                acts={props.acts}
                onInspect={props.onInspect}
                onDelete={(index) => props.dispatch(ScenarioActions.REMOVE_ACTIVITY({ index }))}
            />
        </div>
    );
}
