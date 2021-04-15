import { Divider } from '@material-ui/core';
import React from 'react';
import { Actor } from '../../data/actor/Actor';
import { Asset } from '../../data/asset/Asset';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioDescription, ScenarioStepDescription } from '../../data/scenario/Scenario';
import { IAction } from '../../util/redux';
import { ActorInspector } from './ActorInspector';
import { AddActorMenu } from './AddActorMenu';
import { AddStepMenu } from './AddStepMenu';
import { StepInspector } from './StepInspector';
import { StepSequence } from './StepSequence';

export interface Props {
    steps: ScenarioStepDescription[];
    activeStep: ScenarioStepDescription | undefined;
    activeActor?: { actor: Actor; assets: Asset[] };
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
            {props.activeStep && <StepInspector step={props.activeStep} />}

            <Divider />

            {props.activeActor && <ActorInspector actor={props.activeActor.actor} assets={props.activeActor.assets} />}
            <Divider />

            <AddActorMenu
                label={'Voeg actor toe'}
                actors={props.availableActors}
                onAdd={(actor) => props.dispatch(ScenarioActions.ADD_ACTOR({ actor }))}
            />

            <AddStepMenu onAdd={(step) => props.dispatch(ScenarioActions.ADD_STEP({ step }))} />

            <Divider />
            <StepSequence
                steps={steps}
                activeStepIndex={
                    props.activeStep ? steps.findIndex((s) => s.action.id === props.activeStep?.action.id) : -1
                }
                onInspect={(id) => props.onInspect(props.steps.find((a) => a.action.id === id)!)}
                onDelete={(index) => props.dispatch(ScenarioActions.REMOVE_STEP({ index }))}
            />
        </div>
    );
}
