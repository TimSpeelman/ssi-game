import { Fab } from '@material-ui/core';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../state/scenario/actions';
import {
    selectActiveState,
    selectActiveStep,
    selectActiveStepIndex,
    selectFailedStep,
    selectScenario,
    selectSelectedActorId,
    selectShowMeta,
    selectSnackbarIsOn,
    selectUsedActors,
} from '../../state/scenario/selectors';
import { createNetworkCanvasData } from '../components/networkToCanvas';
import { ScenarioMetaDialog } from '../components/Sidebar/InfoPanel/ScenarioMetaDialog';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SidebarTab } from '../components/Sidebar/SidebarTab';
import { CanvasEvent, SVGNetworkCanvas } from '../components/SVGNetworkCanvas';

export function NetworkCanvas() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const selectedActorId = useSelector(selectSelectedActorId);
    const usedActors = useSelector(selectUsedActors);
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const currentStep = useSelector(selectActiveStep);
    const currentStepIndex = useSelector(selectActiveStepIndex);
    const currentState = useSelector(selectActiveState);
    const failedStep = useSelector(selectFailedStep);
    const showMeta = useSelector(selectShowMeta);

    const scenario = useSelector(selectScenario);

    const [hoveredElemId, setHoveredElemId] = useState('');

    useEffect(() => {
        closeSnackbar();
        if (currentStep && snackbarIsOn) {
            currentStep.outcomes.forEach((o) => enqueueSnackbar(o));
        }
    }, [currentStep]);

    function handleClickActor(id: string) {
        if (selectedActorId === id) {
            dispatch(ScenarioActions.CLEAR_SELECTION());
        } else {
            dispatch(ScenarioActions.SELECT_ACTOR({ id }));
            dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
        }
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
        actors: usedActors,
        modes,
        step: currentStep,
        selectedActorId,
        hoveredElemId,
    });

    return (
        <div className="network-canvas">
            <ScenarioMetaDialog
                meta={scenario.definition.meta}
                open={showMeta}
                handleClose={() => dispatch(ScenarioActions.HIDE_META())}
            />

            <div className="canvasarea">
                <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />
                {failedStep && (
                    <div className="scenario-status">
                        <strong>Scenario faalt bij Stap {scenario.describe().failingAtIndex! + 1}!</strong>
                    </div>
                )}
                <div className="time-navigation">
                    {currentStep ? (
                        <span>
                            <strong>Stap {currentStepIndex + 1}: </strong>
                            {currentStep.action.description}
                        </span>
                    ) : (
                        <span></span>
                    )}
                    <Fab
                        style={{ marginRight: '1rem', marginLeft: '1rem' }}
                        onClick={() => dispatch(ScenarioActions.PREV_STEP())}
                    >
                        <NavigateBefore />
                    </Fab>
                    <Fab onClick={() => dispatch(ScenarioActions.NEXT_STEP())}>
                        <NavigateNext />
                    </Fab>
                </div>
            </div>
            <Sidebar />
        </div>
    );
}
