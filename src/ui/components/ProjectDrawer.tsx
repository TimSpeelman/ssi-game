import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
} from '@material-ui/core';
import { Delete, Description, NoteAdd } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ScenarioActions } from '../../state/scenario/actions';
import {
    selectActiveProjectName,
    selectInactiveProjects,
    selectProjectDrawerOpen,
} from '../../state/scenario/selectors';
import { ProjectState } from '../../state/scenario/state';
import { useLang } from '../hooks/useLang';

export function ProjectDrawer() {
    const { lang, languages, dict, setLang } = useLang();
    const open = useSelector(selectProjectDrawerOpen);
    const activeName = useSelector(selectActiveProjectName);
    const projects = useSelector(selectInactiveProjects);
    const dispatch = useDispatch();

    function close() {
        dispatch(ScenarioActions.CLOSE_PROJECT_DRAWER());
    }

    const activateProject = (project: ProjectState) => {
        dispatch(ScenarioActions.ACTIVATE_PROJECT({ id: project.id }));
        close();
    };

    const newProject = () => {
        const id = uuid();
        dispatch(ScenarioActions.NEW_PROJECT({ id }));
        dispatch(ScenarioActions.ACTIVATE_PROJECT({ id }));
        close();
    };

    function handleDelete(id: string) {
        const conf = confirm(dict.app_msgConfirmDeleteProject);
        if (conf) {
            dispatch(ScenarioActions.DELETE_PROJECT({ id }));
        }
    }

    return (
        <Drawer anchor={'left'} open={open} onClose={close}>
            <ListItem button onClick={newProject}>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <NoteAdd />
                </ListItemIcon>
                <ListItemText primary={'Nieuw Project'} />
            </ListItem>

            <ListSubheader>Huidig Project</ListSubheader>
            <ListItem>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <Description />
                </ListItemIcon>
                <ListItemText primary={activeName === '' ? dict.untitledProject : activeName} />
            </ListItem>
            <ListSubheader>Opgeslagen Projecten</ListSubheader>
            <List>
                {projects.map((pr) => (
                    <ListItem key={pr.id} button onClick={() => activateProject(pr)}>
                        <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                            <Description />
                        </ListItemIcon>
                        <ListItemText
                            primary={pr.name === '' ? dict.untitledProject : pr.name}
                            style={{ marginRight: '2em' }}
                        />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(pr.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
