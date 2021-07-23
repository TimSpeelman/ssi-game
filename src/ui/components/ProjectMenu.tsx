import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ScenarioActions } from '../../state/scenario/actions';
import { selectAllProjects } from '../../state/scenario/selectors';
import { useLang } from '../hooks/useLang';

export function ProjectMenu() {
    const { lang, languages, setLang } = useLang();
    const projects = useSelector(selectAllProjects).map((p) => ({ name: p }));
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const activateProject = (project: any) => {
        dispatch(ScenarioActions.ACTIVATE_PROJECT({ name: project.name }));
        handleClose();
    };

    const newProject = () => {
        const newName = uuid();
        dispatch(ScenarioActions.NEW_PROJECT({ name: newName }));
        dispatch(ScenarioActions.ACTIVATE_PROJECT({ name: newName }));
        handleClose();
    };

    return (
        <Fragment>
            <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'white' }}>
                Projecten
            </Button>
            <Menu id="language-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {projects.map((v) => (
                    <MenuItem key={v.name} onClick={() => activateProject(v)}>
                        {v.name}
                    </MenuItem>
                ))}
                <MenuItem onClick={() => newProject()}>Nieuw Project</MenuItem>
            </Menu>
        </Fragment>
    );
}
