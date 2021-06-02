import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Clear, Restore, RestorePage, Save } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loadScenarioFromFile } from '../persistence/loadScenarioFromFile';
import { loadScenarioFromLocalStorage } from '../persistence/loadScenarioFromLocalStorage';
import { saveScenarioToFile } from '../persistence/saveScenarioToFile';
import { saveScenarioToLocalStorage } from '../persistence/saveScenarioToLocalStorage';
import { ScenarioActions } from '../state/scenario/actions';
import { selectScenarioDef } from '../state/scenario/selectors';
import { NetworkCanvas } from './pages/NetworkCanvasPage';

export function App() {
    const scenario = useSelector(selectScenarioDef);

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
                dispatch(ScenarioActions.SET_SCENARIO({ scenario }));
                alert('Bestand geladen!');
            })
            .catch((e) => alert(e));
    }

    useEffect(() => {
        const restored = loadScenarioFromLocalStorage();
        if (restored) {
            dispatch(ScenarioActions.SET_SCENARIO({ scenario: restored }));
        } else {
            dispatch(ScenarioActions.RESET());
        }
    }, []);

    useEffect(() => {
        saveScenarioToLocalStorage(scenario);
    }, [scenario]);

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
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/netwerk'}>
                        <NetworkCanvas />
                    </Route>
                    {/* Default to Log Start Page */}
                    <Redirect exact from="/" to={'netwerk'} />

                    {/* Catch 404's */}
                    <Redirect from="*" to="/404" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
