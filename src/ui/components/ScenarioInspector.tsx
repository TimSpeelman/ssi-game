import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioMeta } from '../../model/game/Scenario';
import { ScenarioActions } from '../../state/scenario/actions';
import { useNav } from '../hooks/useNav';

interface Props {
    meta: ScenarioMeta;
}

/** Shows the details of a scenario */
export function ScenarioInspector({ meta }: Props) {
    const { goto } = useNav();
    const dispatch = useDispatch();
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h6">{meta.title}</Typography>
            <p>{meta.body.substr(0, 100)}...</p>
            <Button onClick={() => dispatch(ScenarioActions.SHOW_META())}>Toon Omschrijving</Button>
            <Button onClick={() => goto('/configuratie')}>Instellingen</Button>
        </div>
    );
}
