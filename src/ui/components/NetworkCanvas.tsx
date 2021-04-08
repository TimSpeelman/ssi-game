import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { IAction } from '../../util/redux';
import { allActors } from '../data/actors';
import { IInteraction } from '../data/IInteraction';
import { ScenarioActions } from '../data/scenario/actions';
import { ScenarioReducer } from '../data/scenario/reducers';
import { Scenario } from '../data/scenario/Scenario';
import './NetworkCanvas.css';
import { NetworkControls } from './NetworkControls';
import { createNetworkCanvasData } from './networkToCanvas';
import { CanvasEvent, SVGNetworkCanvas } from './SVGNetworkCanvas';

const initialScenario: Scenario = {
    actors: [allActors.gov1, allActors.office1, allActors.person3],
    activities: [
        {
            id: '1',
            from: allActors.gov1,
            to: allActors.person3,
            description: 'Uitgifte van paspoort',
            sub: 'naam, geboortedatum',
        },
        {
            id: '2',
            from: allActors.office1,
            to: allActors.person3,
            description: 'Verzoek om gegevens',
            sub: 'naam, geboortedatum',
        },
        {
            id: '3',
            from: allActors.person3,
            to: allActors.office1,
            description: 'Gegevenspresentatie',
            sub: 'naam, geboortedatum',
        },
    ],
};

export function NetworkCanvas() {
    const [scenario, setScenario] = useState(initialScenario);

    function dispatch(action: IAction<any>) {
        const newState = ScenarioReducer(scenario, action);
        setScenario(newState);
    }

    const [actInspect, setActInspect] = useState<IInteraction | undefined>(undefined);

    function handleInspect(act: IInteraction) {
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

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        actors: scenario.actors,
        interaction: actInspect,
    }).map((e) => (e.id === hover ? { ...e, lit: true } : e));

    const availableActors = Object.values(allActors).filter((a) => !scenario.actors.find((x) => x.id === a.id));

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
