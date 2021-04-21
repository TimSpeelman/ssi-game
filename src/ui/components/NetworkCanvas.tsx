import { Fab } from '@material-ui/core';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import FileSaver from 'file-saver';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { allActors } from '../../config/actors';
import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioReducer } from '../../data/scenario/reducers';
import { Scenario, ScenarioProps } from '../../data/scenario/Scenario';
import { IAction } from '../../util/redux';
import { NetworkControls } from './NetworkControls';
import { createNetworkCanvasData } from './networkToCanvas';
import { CanvasEvent, SVGNetworkCanvas } from './SVGNetworkCanvas';

const serializedScenario = OnlineLiquorPurchaseScenario.serialize();

const initialScenario = Scenario.deserialize(serializedScenario);

const emptyProps: ScenarioProps = {
    initial: {
        actors: {},
    },
    steps: [],
};

export function NetworkCanvas() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [scenarioProps, setScenarioProps] = useState(initialScenario.props);
    const scenario = new Scenario(scenarioProps);
    const scenarioDesc = scenario.describe();

    function clear() {
        setScenarioProps(emptyProps);
    }

    function saveToFile() {
        const blob = new Blob([JSON.stringify(scenario.serialize())], { type: 'application/json;charset=utf-8' });
        const date = new Date().toLocaleString().replace(/:/g, '.');
        const fileName = `SSI-Game Scenario ${date}.json`;
        FileSaver.saveAs(blob, fileName);
    }

    function loadFromFile(e: any) {
        const files = e.target.files;
        console.log('FILES', files);
        if (!files || files.length !== 1) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const txt = reader.result;
            if (!txt) {
                alert('Bestand is leeg');
            }
            try {
                const parsed = JSON.parse(txt as string);
                const scenario = Scenario.deserialize(parsed);
                setScenarioProps(scenario.props);
                alert('Bestand geladen!');
            } catch (e) {
                alert('Bestand kon niet gelezen worden');
            }
        };
        reader.readAsText(files[0], 'utf8');
        e.target.value = null;
    }

    function reset(silent = false) {
        if (silent || confirm('Weet je zeker dat je opnieuw wilt beginnen?')) {
            setScenarioProps(initialScenario.props);
        }
    }

    useEffect(() => {
        const storedScenario = localStorage.getItem('scenario');
        if (storedScenario) {
            try {
                const s = Scenario.deserialize(JSON.parse(storedScenario));
                setScenarioProps(s.props);
            } catch (e) {
                console.log('Recovery from local storage failed, clearing it');
                localStorage.removeItem('scenario');
                setScenarioProps(initialScenario.props);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('scenario', JSON.stringify(scenario.serialize()));
    }, [scenarioProps]);

    function dispatch(action: IAction<any>) {
        const newState = ScenarioReducer(scenarioProps, action);
        setScenarioProps(newState);
    }

    const [hoveredElemId, setHoveredElemId] = useState('');

    const [snackbarIsOn, setSnackbarOn] = useState(true);
    const [stepIsSelected, setStepIsSelected] = useState(false);

    const [currentStepId, activateStep] = useState<string | undefined>(undefined);
    const currentStep = scenarioDesc.steps.find((s) => s.action.id === currentStepId);
    const currentStepIndex = currentStepId ? scenarioDesc.steps.findIndex((s) => s.action.id === currentStepId) : -1;
    const currentState = currentStep ? currentStep.result : scenarioProps.initial;

    useEffect(() => {
        closeSnackbar();
        if (currentStep && snackbarIsOn) {
            currentStep.outcomes.forEach((o) => enqueueSnackbar(o));
        }
    }, [currentStepId]);

    const [selectedActorId, selectActor] = useState<string | undefined>(undefined);
    const selectedActor = selectedActorId ? currentState.actors[selectedActorId] : undefined;

    function handleClickActor(id: string) {
        selectActor(selectedActorId === id ? undefined : id);
        setStepIsSelected(false);
    }

    function handleClickStep(id: string) {
        activateStep(id);
        selectActor(undefined);
        setStepIsSelected(true);
    }

    function nextStep() {
        const index = currentStepIndex >= scenarioDesc.steps.length - 1 ? -1 : currentStepIndex + 1;
        activateStep(index < 0 ? undefined : scenarioDesc.steps[index].action.id);
    }

    function prevStep() {
        const index = currentStepIndex === -1 ? scenarioDesc.steps.length - 1 : currentStepIndex - 1;
        activateStep(index < 0 ? undefined : scenarioDesc.steps[index].action.id);
    }

    const handleEvent = (ev: CanvasEvent) => {
        switch (ev.type) {
            case 'slot-enter':
                return setHoveredElemId(ev.id);
            case 'slot-leave':
                return hoveredElemId === ev.id ? setHoveredElemId('') : null;
            case 'slot-click':
                return handleClickActor(ev.id);
            case 'conn-enter':
                return setHoveredElemId(ev.id);
            case 'conn-leave':
                return hoveredElemId === ev.id ? setHoveredElemId('') : null;
            case 'slot-delete':
                return dispatch(ScenarioActions.REMOVE_ACTOR({ id: ev.id }));
        }
    };

    const actors = Object.values(scenarioProps.initial.actors).map((a) => a.actor); // TODO initial state

    // TODO unhack me. Demonstrates use of modes so Actors are displayed to perform actions (e.g. taking a selfie)
    const modes = !currentStep
        ? {}
        : {
              [currentStep.action.from.id]: currentStep.action.from_mode,
              [currentStep.action.to.id]: currentStep.action.to_mode,
          };

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        state: currentState,
        actors: actors,
        modes,
        step: currentStep,
        selectedActorId,
        hoveredElemId,
    });

    const unusedActors = Object.values(allActors).filter((a) => !actors.find((x) => x.id === a.id));
    const usedActors = Object.values(allActors).filter((a) => actors.find((x) => x.id === a.id));

    return (
        <div className="network-canvas">
            <div className="canvasarea">
                <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />
                <div className="time-navigation">
                    {currentStep ? (
                        <span>
                            <strong>Stap {currentStepIndex + 1}: </strong>
                            {currentStep.action.description}
                        </span>
                    ) : (
                        <span></span>
                    )}
                    <Fab style={{ marginRight: '1rem', marginLeft: '1rem' }} onClick={prevStep}>
                        <NavigateBefore />
                    </Fab>
                    <Fab onClick={nextStep}>
                        <NavigateNext />
                    </Fab>
                </div>
            </div>
            <div className="sidebar">
                <NetworkControls
                    clear={clear}
                    reset={reset}
                    saveToFile={saveToFile}
                    loadFromFile={loadFromFile}
                    activeActor={selectedActor}
                    activeStep={currentStep}
                    stepIsSelected={stepIsSelected}
                    scenario={scenarioDesc}
                    unusedActors={unusedActors}
                    usedActors={usedActors}
                    steps={scenarioDesc.steps}
                    snackbarIsOn={snackbarIsOn}
                    setSnackbarOn={setSnackbarOn}
                    dispatch={dispatch}
                    onInspect={handleClickStep}
                />
            </div>
        </div>
    );
}
