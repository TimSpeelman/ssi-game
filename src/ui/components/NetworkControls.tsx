import { Button, Divider } from '@material-ui/core';
import { Add, Clear, Restore, RestorePage, Save } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { Actor } from '../../data/actor/Actor';
import { Asset } from '../../data/asset/Asset';
import { ScenarioDescription, ScenarioStepDescription } from '../../data/scenario/Scenario';
import { ScenarioActions } from '../../state/scenario/actions';
import { IAction } from '../../util/redux';
import { ActorInspector } from './ActorInspector';
import { AddActorMenu } from './AddActorMenu';
import { AddStepMenu } from './AddStepMenu';
import { StepInspector } from './StepInspector';
import { StepSequence } from './StepSequence';

export interface Props {
    steps: ScenarioStepDescription[];
    activeStep: ScenarioStepDescription | undefined;
    stepIsSelected: boolean;
    activeActor?: { actor: Actor; assets: Asset[] };
    onInspect: (stepId?: string) => void;
    dispatch: (action: IAction<any>) => void;
    unusedActors: Actor[];
    usedActors: Actor[];
    scenario: ScenarioDescription;
    snackbarIsOn: boolean;
    saveToFile: () => void;
    loadFromFile: (files: any) => void;
    setSnackbarOn: (v: boolean) => void;
}

export function NetworkControls(props: Props) {
    // const actions = props.acts.map((a) => describe(a, props.scenario));
    const steps = props.steps;

    const handleClear = () =>
        confirm('Weet je zeker dat je alles wilt wissen?') && props.dispatch(ScenarioActions.CLEAR());
    const handleReset = () =>
        confirm('Weet je zeker dat je alles terug wilt zetten?') && props.dispatch(ScenarioActions.RESET());

    return (
        <div>
            {props.activeStep && props.stepIsSelected && <StepInspector step={props.activeStep} />}
            {props.activeStep && props.stepIsSelected && <Divider />}

            {props.activeActor && <ActorInspector actor={props.activeActor.actor} assets={props.activeActor.assets} />}
            {props.activeActor && <Divider />}

            <div style={{ padding: '1rem' }}>
                <Button variant={'outlined'} onClick={handleClear}>
                    <Clear /> Legen
                </Button>{' '}
                <Button variant={'outlined'} onClick={handleReset}>
                    <Restore /> Reset
                </Button>{' '}
                <Button variant={'outlined'} onClick={props.saveToFile}>
                    <Save /> Opslaan
                </Button>{' '}
                <Button variant={'outlined'} component={'label'}>
                    <RestorePage /> Laden
                    <input type="file" hidden value={undefined} onChange={(e) => props.loadFromFile(e)} />
                </Button>
            </div>

            <Divider />
            <div style={{ padding: '1rem' }}>
                <AddActorMenu
                    label={
                        <Fragment>
                            <Add /> Actor
                        </Fragment>
                    }
                    actors={props.unusedActors}
                    onAdd={(actor) => props.dispatch(ScenarioActions.ADD_ACTOR({ actor }))}
                />{' '}
                <AddStepMenu
                    availableActors={props.usedActors}
                    onAdd={(step) => props.dispatch(ScenarioActions.ADD_STEP({ step }))}
                />{' '}
            </div>

            <Divider />

            <div style={{ padding: '1rem' }}>
                <Button variant={'outlined'} onClick={() => props.setSnackbarOn(!props.snackbarIsOn)}>
                    {props.snackbarIsOn ? 'Verberg Meldingen' : 'Toon Meldingen'}
                </Button>
            </div>

            <Divider />
            <StepSequence
                steps={steps}
                stepIsSelected={props.stepIsSelected}
                activeStepIndex={
                    props.activeStep ? steps.findIndex((s) => s.action.id === props.activeStep?.action.id) : -1
                }
                onInspect={(id) => props.onInspect(id)}
                onDelete={(index) => props.dispatch(ScenarioActions.REMOVE_STEP({ index }))}
            />
        </div>
    );
}
