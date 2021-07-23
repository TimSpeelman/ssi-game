import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ScenarioActions } from '../../state/scenario/actions';
import { selectActiveProjectName, selectAllProjects } from '../../state/scenario/selectors';
import { useLang } from '../hooks/useLang';

export function ProjectMenu() {
    const { lang, languages, dict, setLang } = useLang();
    const activeName = useSelector(selectActiveProjectName);
    const projects = useSelector(selectAllProjects);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const activateProject = (project: any) => {
        dispatch(ScenarioActions.ACTIVATE_PROJECT({ id: project.id }));
        handleClose();
    };

    const newProject = () => {
        const id = uuid();
        dispatch(ScenarioActions.NEW_PROJECT({ id }));
        dispatch(ScenarioActions.ACTIVATE_PROJECT({ id }));
        handleClose();
    };

    return (
        <Fragment>
            <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'white' }}>
                Project {activeName === '' ? dict.untitled : activeName}
            </Button>
            <Menu id="language-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {projects.map((v) => (
                    <MenuItem key={v.id} onClick={() => activateProject(v)}>
                        {v.name === '' ? dict.untitled : v.name}
                    </MenuItem>
                ))}
                <MenuItem onClick={() => newProject()}>Nieuw Project</MenuItem>
            </Menu>
        </Fragment>
    );
}
