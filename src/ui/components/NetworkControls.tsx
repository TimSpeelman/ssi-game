import { Button, Divider } from '@material-ui/core';
import { Add, Clear, RestorePage, Save } from '@material-ui/icons';
import React, { Fragment } from 'react';
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
    reset: () => void;
}

export function NetworkControls(props: Props) {
    // const actions = props.acts.map((a) => describe(a, props.scenario));
    const steps = props.steps;

    return (
        <div>
            {props.activeStep && props.stepIsSelected && <StepInspector step={props.activeStep} />}
            {props.activeStep && props.stepIsSelected && <Divider />}

            {props.activeActor && <ActorInspector actor={props.activeActor.actor} assets={props.activeActor.assets} />}
            {props.activeActor && <Divider />}

            <div style={{ padding: '1rem' }}>
                <Button variant={'outlined'} onClick={props.reset}>
                    <Clear /> Reset
                </Button>{' '}
                <Button variant={'outlined'} onClick={props.saveToFile}>
                    <Save /> Opslaan
                </Button>{' '}
                <Button variant={'outlined'} component={'label'}>
                    <RestorePage /> Laden
                    <input
                        type="file"
                        hidden
                        onChange={(e) =>
                            e.target.files && e.target.files.length > 0 && props.loadFromFile(e.target.files)
                        }
                    />
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
