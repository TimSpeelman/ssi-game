import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Actor } from '../data/Actor';
import { IInteraction } from '../data/IInteraction';
import { ActivitySequence } from './ActivitySequence';
import { AddActivityMenu } from './AddActivityMenu';
import { AddActorMenu } from './AddActorMenu';
import './NetworkCanvas.css';

export interface Props {
    acts: IInteraction[];
    onInspect: (act: IInteraction) => void;
    onDelete: (index: number) => void;
    onAddActor: (actor: Actor) => void;
    onAddAct: (act: IInteraction) => void;
    availableActors: Actor[];
}
export function NetworkControls(props: Props) {
    return (
        <Paper elevation={3} style={{ margin: 20, padding: 20 }}>
            <AddActorMenu label={'Voeg actor toe'} actors={props.availableActors} onAdd={props.onAddActor} />

            <AddActivityMenu onAdd={props.onAddAct} />

            <ActivitySequence acts={props.acts} onInspect={props.onInspect} onDelete={props.onDelete} />
        </Paper>
    );
}
