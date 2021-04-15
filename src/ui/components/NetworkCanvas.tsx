import React, { useState } from 'react';
import { allActors } from '../../config/actors';
import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioReducer } from '../../data/scenario/reducers';
import { Scenario, ScenarioStepDescription } from '../../data/scenario/Scenario';
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

    const [activeActorId, setActiveActor] = useState<string | undefined>(undefined);
    const [actInspect, setActInspect] = useState<ScenarioStepDescription | undefined>(undefined);

    const currentState = actInspect ? actInspect.result : scenario.initial;
    const activeActor = activeActorId ? currentState.actors[activeActorId] : undefined;

    function handleInspectStep(act: ScenarioStepDescription) {
        setActInspect(act);
    }

    function handleInspectActor(actorId: string) {
        setActiveActor(actorId);
    }

    const [hover, setHover] = useState('');

    console.log('hovering,', hover);

    const handleEvent = (ev: CanvasEvent) => {
        switch (ev.type) {
            case 'slot-enter':
                return setHover(ev.id);
            case 'slot-leave':
                return hover === ev.id ? setHover('') : null;
            case 'slot-click':
                return handleInspectActor(ev.id);
            case 'conn-enter':
                return setHover(ev.id);
            case 'conn-leave':
                return hover === ev.id ? setHover('') : null;
            case 'slot-delete':
                return dispatch(ScenarioActions.REMOVE_ACTOR({ id: ev.id }));
        }
    };

    const actors = Object.values(scenario.initial.actors).map((a) => a.actor); // TODO initial state

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        actors: actors,
        step: actInspect,
    }).map((e) => (e.id === hover ? { ...e, lit: true } : e));

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
                    onInspect={handleInspectStep}
                />
            </div>
        </div>
    );
}
