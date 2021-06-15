import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioMeta } from '../../../../model/definition/ScenarioMeta';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { useLang } from '../../../hooks/useLang';
import { useNav } from '../../../hooks/useNav';

interface Props {
    meta: ScenarioMeta;
}

/** Shows the details of a scenario */
export function ScenarioInspector({ meta }: Props) {
    const { goto } = useNav();
    const dispatch = useDispatch();
    const { dict } = useLang();
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h6">{meta.title}</Typography>
            <p>
                {dict.author}: {meta.author}
            </p>
            <p>{meta.body}</p>
            <Button onClick={() => dispatch(ScenarioActions.SHOW_META())}>{dict.btnEditScenarioMeta}</Button>
            {/* <Button onClick={() => goto('/configuratie')}>Instellingen</Button> */}
        </div>
    );
}
