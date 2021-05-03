import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Clear, Restore, RestorePage, Save } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadScenarioFromFile } from '../persistence/loadScenarioFromFile';
import { saveScenarioToFile } from '../persistence/saveScenarioToFile';
import { ScenarioActions } from '../state/scenario/actions';
import { selectScenario } from '../state/scenario/selectors';
import { NetworkCanvas } from './components/NetworkCanvas';

export function App() {
    const scenario = useSelector(selectScenario);

    const dispatch = useDispatch();

    const clear = () => confirm('Weet je zeker dat je alles wilt wissen?') && dispatch(ScenarioActions.CLEAR());

    const reset = () => confirm('Weet je zeker dat je alles terug wilt zetten?') && dispatch(ScenarioActions.RESET());

    const saveToFile = () => saveScenarioToFile(scenario);

    function loadFromFile(e: any) {
        const files = e.target.files;
        console.log('FILES', files);
        if (!files || files.length !== 1) return;

        loadScenarioFromFile(files[0])
            .then((scenario) => {
                dispatch(ScenarioActions.SET_SCENARIO({ scenario: scenario.props }));
                alert('Bestand geladen!');
            })
            .catch((e) => alert(e));
    }

    return (
        <div className="fill">
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Identity Game
                    </Typography>
                    <Button color={'inherit'} onClick={clear} style={{ marginRight: '.5rem' }}>
                        <Clear /> Legen
                    </Button>
                    <Button color={'inherit'} onClick={reset} style={{ marginRight: '.5rem' }}>
                        <Restore /> Reset
                    </Button>
                    <Button color={'inherit'} onClick={saveToFile} style={{ marginRight: '.5rem' }}>
                        <Save /> Opslaan
                    </Button>
                    <Button color={'inherit'} component={'label'}>
                        <RestorePage /> Laden
                        <input type="file" hidden value={undefined} onChange={(e) => loadFromFile(e)} />
                    </Button>
                </Toolbar>
            </AppBar>
            <NetworkCanvas />
        </div>
    );
}
