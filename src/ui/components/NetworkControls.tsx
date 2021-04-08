import Paper from '@material-ui/core/Paper';
import React from 'react';
import { IAction } from '../../util/redux';
import { Actor } from '../data/Actor';
import { IInteraction } from '../data/IInteraction';
import { ScenarioActions } from '../data/scenario/actions';
import { ActivitySequence } from './ActivitySequence';
import { AddActivityMenu } from './AddActivityMenu';
import { AddActorMenu } from './AddActorMenu';
import './NetworkCanvas.css';

export interface Props {
    acts: IInteraction[];
    onInspect: (act: IInteraction) => void;
    dispatch: (action: IAction<any>) => void;
    availableActors: Actor[];
}
export function NetworkControls(props: Props) {
    return (
        <Paper elevation={3} style={{ margin: 20, padding: 20 }}>
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
        </Paper>
    );
}
