import React, { useState } from 'react';
import { allActors } from '../../config/actors';
import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioReducer } from '../../data/scenario/reducers';
import { Scenario } from '../../data/scenario/Scenario';
import { IAction } from '../../util/redux';
import { NetworkControls } from './NetworkControls';
import { createNetworkCanvasData } from './networkToCanvas';
import { CanvasEvent, SVGNetworkCanvas } from './SVGNetworkCanvas';

const initialScenario = OnlineLiquorPurchaseScenario;

export function NetworkCanvas() {
    const [scenario, setScenario] = useState(initialScenario.props);
    const scenarioDesc = new Scenario(scenario).describe();

    function dispatch(action: IAction<any>) {
        const newState = ScenarioReducer(scenario, action);
        setScenario(newState);
    }

    const [hoveredElemId, setHoveredElemId] = useState('');
    const [selectedActorId, setSelectedActorId] = useState<string | undefined>(undefined);
    const [currentStepId, setCurrentStepId] = useState<string | undefined>(undefined);

    const actInspect = scenarioDesc.steps.find((s) => s.action.id === currentStepId);
    const currentState = actInspect ? actInspect.result : scenario.initial;
    const activeActor = selectedActorId ? currentState.actors[selectedActorId] : undefined;

    const handleEvent = (ev: CanvasEvent) => {
        switch (ev.type) {
            case 'slot-enter':
                return setHoveredElemId(ev.id);
            case 'slot-leave':
                return hoveredElemId === ev.id ? setHoveredElemId('') : null;
            case 'slot-click':
                return setSelectedActorId(selectedActorId === ev.id ? undefined : ev.id);
            case 'conn-enter':
                return setHoveredElemId(ev.id);
            case 'conn-leave':
                return hoveredElemId === ev.id ? setHoveredElemId('') : null;
            case 'slot-delete':
                return dispatch(ScenarioActions.REMOVE_ACTOR({ id: ev.id }));
        }
    };

    const actors = Object.values(scenario.initial.actors).map((a) => a.actor); // TODO initial state

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        state: currentState,
        actors: actors,
        step: actInspect,
        selectedActorId,
        hoveredElemId,
    });

    const availableActors = Object.values(allActors).filter((a) => !actors.find((x) => x.id === a.id));

    return (
        <div className="network-canvas">
            <div className="canvasarea">
                <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />
            </div>
            <div className="sidebar">
                <NetworkControls
                    activeActor={activeActor}
                    activeStep={actInspect}
                    scenario={scenarioDesc}
                    availableActors={availableActors}
                    steps={scenarioDesc.steps}
                    dispatch={dispatch}
                    onInspect={setCurrentStepId}
                />
            </div>
        </div>
    );
}
