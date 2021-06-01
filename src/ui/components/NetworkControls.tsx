import { Button, Divider } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../state/scenario/actions';
import {
    selectScenarioMeta,
    selectSelectedActor,
    selectSelectedStep,
    selectSnackbarIsOn,
    selectUsedActors,
} from '../../state/scenario/selectors';

export function NetworkControls() {
    const selectedStep = useSelector(selectSelectedStep);
    const selectedActor = useSelector(selectSelectedActor);
    const usedActors = useSelector(selectUsedActors);
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const meta = useSelector(selectScenarioMeta);
    const dispatch = useDispatch();

    return (
        <div>
            <div style={{ padding: '1rem' }}>
                <Button variant={'outlined'} onClick={() => dispatch(ScenarioActions.TOGGLE_SNACKBAR())}>
                    {snackbarIsOn ? 'Verberg Meldingen' : 'Toon Meldingen'}
                </Button>
            </div>

            <Divider />
        </div>
    );
}
