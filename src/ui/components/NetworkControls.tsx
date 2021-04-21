import { Button, Divider } from '@material-ui/core';
import { Add, Clear, Restore, RestorePage, Save } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadScenarioFromFile } from '../../persistence/loadScenarioFromFile';
import { saveScenarioToFile } from '../../persistence/saveScenarioToFile';
import { ScenarioActions } from '../../state/scenario/actions';
import {
    selectScenario,
    selectSelectedActor,
    selectSelectedStep,
    selectSnackbarIsOn,
    selectUnusedActors,
    selectUsedActors,
} from '../../state/scenario/selectors';
import { ActorInspector } from './ActorInspector';
import { AddActorMenu } from './AddActorMenu';
import { AddStepMenu } from './AddStepMenu';
import { StepInspector } from './StepInspector';
import { StepSequence } from './StepSequence';

export function NetworkControls() {
    const selectedStep = useSelector(selectSelectedStep);
    const selectedActor = useSelector(selectSelectedActor);
    const usedActors = useSelector(selectUsedActors);
    const unusedActors = useSelector(selectUnusedActors);
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const scenario = useSelector(selectScenario);
    const dispatch = useDispatch();

    const clear = () => confirm('Weet je zeker dat je alles wilt wissen?') && dispatch(ScenarioActions.CLEAR());

    const reset = () => confirm('Weet je zeker dat je alles terug wilt zetten?') && dispatch(ScenarioActions.RESET());

    const saveToFile = () => saveScenarioToFile(scenario);

    function loadFromFile(e: any) {
        const files = e.target.files;
        console.log('FILES', files);
        if (!files || files.length !== 1) return;

        loadScenarioFromFile(files[0])
            .then((scenario) => {
                dispatch(ScenarioActions.SET_SCENARIO({ scenario: scenario.props }));
                alert('Bestand geladen!');
            })
            .catch((e) => alert(e));
    }

    return (
        <div>
            {selectedStep && <StepInspector step={selectedStep} />}
            {selectedStep && <Divider />}

            {selectedActor && <ActorInspector actor={selectedActor.actor} assets={selectedActor.assets} />}
            {selectedActor && <Divider />}

            <div style={{ padding: '1rem' }}>
                <Button variant={'outlined'} onClick={clear}>
                    <Clear /> Legen
                </Button>{' '}
                <Button variant={'outlined'} onClick={reset}>
                    <Restore /> Reset
                </Button>{' '}
                <Button variant={'outlined'} onClick={saveToFile}>
                    <Save /> Opslaan
                </Button>{' '}
                <Button variant={'outlined'} component={'label'}>
                    <RestorePage /> Laden
                    <input type="file" hidden value={undefined} onChange={(e) => loadFromFile(e)} />
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
