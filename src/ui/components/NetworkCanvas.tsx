import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { Actor } from '../data/Actor';
import { allActors } from '../data/actors';
import { IInteraction } from '../data/IInteraction';
import './NetworkCanvas.css';
import { NetworkControls } from './NetworkControls';
import { createNetworkCanvasData } from './networkToCanvas';
import { CanvasEvent, SVGNetworkCanvas } from './SVGNetworkCanvas';

const initialActors = [allActors.gov1, allActors.office1, allActors.person3];

const initialActs: IInteraction[] = [
    {
        from: allActors.gov1,
        to: allActors.person3,
        description: 'Uitgifte van paspoort',
        sub: 'naam, geboortedatum',
    },
    {
        from: allActors.office1,
        to: allActors.person3,
        description: 'Verzoek om gegevens',
        sub: 'naam, geboortedatum',
    },
    {
        from: allActors.person3,
        to: allActors.office1,
        description: 'Gegevenspresentatie',
        sub: 'naam, geboortedatum',
    },
];

export function NetworkCanvas() {
    const [actors, setActors] = useState(initialActors);
    const [acts, setActs] = useState(initialActs);

    function addActor(actor: Actor) {
        setActors([...actors, actor]);
    }
    function addAct(act: IInteraction) {
        setActs([...acts, act]);
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
                return setActors((actors) => actors.filter((_, i) => `slot-${i}` !== ev.id));
        }
    };

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        actors: actors,
        interaction: actInspect,
    }).map((e) => (e.id === hover ? { ...e, lit: true } : e));

    const availableActors = Object.values(allActors).filter((a) => !actors.find((x) => x.id === a.id));

    function handleDeleteAct(index: number) {
        setActs(acts.filter((_, i) => i !== index));
    }

    return (
        <div className="network-canvas">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />
                </Grid>
                <Grid item xs={6}>
                    <NetworkControls
                        onDelete={handleDeleteAct}
                        availableActors={availableActors}
                        acts={acts}
                        onInspect={handleInspect}
                        onAddActor={addActor}
                        onAddAct={addAct}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
