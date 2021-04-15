import React from 'react';
import { Actor } from '../../data/actor/Actor';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioDescription, ScenarioStepDescription } from '../../data/scenario/Scenario';
import { IAction } from '../../util/redux';
import { AddActorMenu } from './AddActorMenu';
import { AddStepMenu } from './AddStepMenu';
import { StepSequence } from './StepSequence';

export interface Props {
    steps: ScenarioStepDescription[];
    onInspect: (step: ScenarioStepDescription) => void;
    dispatch: (action: IAction<any>) => void;
    availableActors: Actor[];
    scenario: ScenarioDescription;
}

export function NetworkControls(props: Props) {
    // const actions = props.acts.map((a) => describe(a, props.scenario));
    const steps = props.steps;

    return (
        <div style={{ margin: 20, padding: 20 }}>
            <AddActorMenu
                label={'Voeg actor toe'}
                actors={props.availableActors}
                onAdd={(actor) => props.dispatch(ScenarioActions.ADD_ACTOR({ actor }))}
            />

            <AddStepMenu onAdd={(step) => props.dispatch(ScenarioActions.ADD_STEP({ step }))} />

            <StepSequence
                steps={steps}
                onInspect={(id) => props.onInspect(props.steps.find((a) => a.action.id === id)!)}
                onDelete={(index) => props.dispatch(ScenarioActions.REMOVE_STEP({ index }))}
            />
        </div>
    );
}
