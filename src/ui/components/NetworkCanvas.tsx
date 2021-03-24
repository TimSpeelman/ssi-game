import React, { useEffect, useState } from 'react';
import './NetworkCanvas.css';
import { Actor, createNetworkCanvasData } from './networkToCanvas';
import { CanvasEvent, SVGNetworkCanvas } from './SVGNetworkCanvas';

const allActors: Actor[] = [
    { image: 'person3' },
    { image: 'gov1' },
    { image: 'office1' },
    { image: 'office2' },
    { image: 'office3' },
    { image: 'person1' },
    { image: 'person2' },
    { image: 'shop1' },
];

export function NetworkCanvas() {
    const [n, setN] = useState(2);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [actors, setActors] = useState(allActors);

    useEffect(() => {
        setActors(allActors.slice(0, n));
    }, [n]);

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
        actors: actors.slice(0, n),
        interaction: from !== to ? { from, to } : undefined,
    }).map((e) => (e.id === hover ? { ...e, lit: true } : e));

    return (
        <div className="network-canvas">
            <div>
                <input type="number" step={1} value={n} onChange={(e) => setN(parseInt(e.target.value, 10) || 0)} />
                <input
                    type="number"
                    step={1}
                    value={from}
                    onChange={(e) => setFrom(parseInt(e.target.value, 10) || 0)}
                />
                <input type="number" step={1} value={to} onChange={(e) => setTo(parseInt(e.target.value, 10) || 0)} />
            </div>
            <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />
        </div>
    );
}
