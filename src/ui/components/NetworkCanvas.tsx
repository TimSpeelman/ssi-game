import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { allActors } from '../../config/actors';
import { scenario1 } from '../../config/scenarios/scenario1';
import { Interaction } from '../../data/action/Interaction';
import { ScenarioActions } from '../../data/scenario/actions';
import { ScenarioReducer } from '../../data/scenario/reducers';
import { IAction } from '../../util/redux';
import { NetworkControls } from './NetworkControls';
import { createNetworkCanvasData } from './networkToCanvas';
import { CanvasEvent, SVGNetworkCanvas } from './SVGNetworkCanvas';

const initialScenario = scenario1;

export function NetworkCanvas() {
    const [scenario, setScenario] = useState(initialScenario);

    function dispatch(action: IAction<any>) {
        const newState = ScenarioReducer(scenario, action);
        setScenario(newState);
    }

    const [actInspect, setActInspect] = useState<Interaction | undefined>(undefined);

    function handleInspect(act: Interaction) {
        setActInspect(act);
    }

    const [hover, setHover] = useState('');

    console.log('hovering,', hover);

    const handleEvent = (ev: CanvasEvent) => {
        switch (ev.type) {
            case 'slot-enter':
                return setHover(ev.id);
            case 'slot-leave':
                return hover === ev.id ? setHover('') : null;
            case 'conn-enter':
                return setHover(ev.id);
            case 'conn-leave':
                return hover === ev.id ? setHover('') : null;
            case 'slot-delete':
                return dispatch(ScenarioActions.REMOVE_ACTOR({ id: ev.id }));
        }
    };

    const actors = Object.values(scenario.actors).map((a) => a.actor);

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        actors: actors,
        interaction: actInspect,
    }).map((e) => (e.id === hover ? { ...e, lit: true } : e));

    const availableActors = Object.values(allActors).filter((a) => !actors.find((x) => x.id === a.id));

    return (
        <div className="network-canvas">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />
                </Grid>
                <Grid item xs={6}>
                    <NetworkControls
                        availableActors={availableActors}
                        acts={scenario.activities}
                        dispatch={dispatch}
                        onInspect={handleInspect}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
