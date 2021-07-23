import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    TextField,
} from '@material-ui/core';
import { Delete, Description, Edit, NoteAdd, RestorePage, Save } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ProjectActions, ScenarioActions } from '../../state/scenario/actions';
import {
    selectActiveProjectName,
    selectInactiveProjects,
    selectProjectDrawerOpen,
} from '../../state/scenario/selectors';
import { ProjectState } from '../../state/scenario/state';
import { useFilePersistence } from '../hooks/useFilePersistence';
import { useLang } from '../hooks/useLang';
import { HiddenFileInput } from './HiddenFileInput';

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

    const [editingName, setEditingName] = useState(false);
    const [pName, setPName] = useState('');
    useEffect(() => setPName(activeName), [activeName]);
    function renameProject(e: any) {
        e.preventDefault();
        dispatch(ProjectActions.RENAME_PROJECT({ name: pName }));
        setEditingName(false);
    }

    const { saveToFile, loadFromFile } = useFilePersistence();

    function handleFileUpload(files: FileList) {
        if (files.length === 1) {
            loadFromFile(files[0]).then(() => close());
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

            <ListItem button component={'label'}>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <RestorePage />
                </ListItemIcon>
                <ListItemText primary={dict.btnLoadFromFile} />
                <HiddenFileInput onSelectFiles={handleFileUpload} />
            </ListItem>

            <ListSubheader>Huidig Project</ListSubheader>
            <ListItem>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <Description />
                </ListItemIcon>
                {editingName ? (
                    <form onSubmit={renameProject}>
                        <TextField
                            variant={'outlined'}
                            style={{ color: 'inherit' }}
                            value={pName}
                            placeholder={activeName === '' ? dict.untitledProject : activeName}
                            onChange={(e) => setPName(e.target.value)}
                            onBlur={renameProject}
                        />
                    </form>
                ) : (
                    <Fragment>
                        <ListItemText
                            primary={activeName === '' ? dict.untitledProject : activeName}
                            style={{ marginRight: '3rem' }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => setEditingName(true)}>
                                <Edit />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Fragment>
                )}
            </ListItem>
            <ListItem button onClick={saveToFile}>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <Save />
                </ListItemIcon>
                <ListItemText primary={dict.btnSaveToFile} />
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
