import React from 'react';
import { Actor } from '../../data/actor/Actor';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioDescription, ScenarioStepDescription } from '../../data/scenario/Scenario';
import { IAction } from '../../util/redux';
import { ActivitySequence } from './ActivitySequence';
import { AddActivityMenu } from './AddActivityMenu';
import { AddActorMenu } from './AddActorMenu';

export interface Props {
    acts: ScenarioStepDescription[];
    onInspect: (act: ScenarioStepDescription) => void;
    dispatch: (action: IAction<any>) => void;
    availableActors: Actor[];
    scenario: ScenarioDescription;
}

export function NetworkControls(props: Props) {
    // const actions = props.acts.map((a) => describe(a, props.scenario));
    const actions = props.acts;

    console.log(actions);

    return (
        <div style={{ margin: 20, padding: 20 }}>
            <AddActorMenu
                label={'Voeg actor toe'}
                actors={props.availableActors}
                onAdd={(actor) => props.dispatch(ScenarioActions.ADD_ACTOR({ actor }))}
            />

            <AddActivityMenu onAdd={(step) => props.dispatch(ScenarioActions.ADD_STEP({ step }))} />

            <ActivitySequence
                acts={actions}
                onInspect={(id) => props.onInspect(props.acts.find((a) => a.action.id === id)!)}
                onDelete={(index) => props.dispatch(ScenarioActions.REMOVE_STEP({ index }))}
            />
        </div>
    );
}
