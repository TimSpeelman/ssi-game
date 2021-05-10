import { Button, Divider } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../state/scenario/actions';
import {
    selectScenarioMeta,
    selectSelectedActor,
    selectSelectedStep,
    selectSnackbarIsOn,
    selectUnusedActors,
    selectUsedActors,
} from '../../state/scenario/selectors';
import { ActorInspector } from './ActorInspector';
import { AddActorMenu } from './AddActorMenu';
import { AddStepMenu } from './AddStepMenu';
import { ScenarioInspector } from './ScenarioInspector';
import { StepInspector } from './StepInspector';
import { StepSequence } from './StepSequence';

export function NetworkControls() {
    const selectedStep = useSelector(selectSelectedStep);
    const selectedActor = useSelector(selectSelectedActor);
    const usedActors = useSelector(selectUsedActors);
    const unusedActors = useSelector(selectUnusedActors);
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const meta = useSelector(selectScenarioMeta);
    const dispatch = useDispatch();

    return (
        <div>
            <ScenarioInspector meta={meta} />
            <Divider />

            {selectedStep && <StepInspector step={selectedStep} />}
            {selectedStep && <Divider />}

            {selectedActor && <ActorInspector actor={selectedActor.actor} assets={selectedActor.assets} />}
            {selectedActor && <Divider />}

            <Divider />
            <div style={{ padding: '1rem' }}>
                <AddActorMenu
                    label={
                        <Fragment>
                            <Add /> Actor
                        </Fragment>
                    }
                    actors={unusedActors}
                    onAdd={(actor) => dispatch(ScenarioActions.ADD_ACTOR({ actor }))}
                />{' '}
                <AddStepMenu
                    availableActors={usedActors}
                    onAdd={(step) => dispatch(ScenarioActions.ADD_STEP({ step }))}
                />{' '}
            </div>

            <Divider />

            <div style={{ padding: '1rem' }}>
                <Button variant={'outlined'} onClick={() => dispatch(ScenarioActions.TOGGLE_SNACKBAR())}>
                    {snackbarIsOn ? 'Verberg Meldingen' : 'Toon Meldingen'}
                </Button>
            </div>

            <Divider />
            <StepSequence />
        </div>
    );
}
