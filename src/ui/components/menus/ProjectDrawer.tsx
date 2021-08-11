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
import { Delete, Description, Edit, FileCopy, NoteAdd, RestorePage, Save } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ContentLibraryDisplayScenario } from '../../../content/DigitalIdentity1/scenarios/ContentLibraryDisplay';
import { OnlineLiquorPurchaseScenario } from '../../../content/DigitalIdentity1/scenarios/OnlineLiquorPurchaseScenario';
import { GameActions } from '../../../state/actions';
import { ProjectActions } from '../../../state/project/actions';
import { ProjectState } from '../../../state/project/state';
import { selectActiveProjectName, selectInactiveProjects, selectProjectDrawerOpen } from '../../../state/selectors';
import { formatL } from '../../../util/util';
import { useFilePersistence } from '../../hooks/useFilePersistence';
import { useLang } from '../../hooks/useLang';
import { HiddenFileInput } from '../elements/HiddenFileInput';

const templates: Record<string, any> = {
    // TODO FIXME
    OnlineLiquorPurchaseScenario: {
        id: 'OnlineLiquorPurchaseScenario',
        definition: OnlineLiquorPurchaseScenario,
        title: {
            NL: 'Alcoholverkoop',
            EN: 'Liquor purchase',
        },
    },
    ContentLibraryDisplay: {
        id: 'ContentLibraryDisplayScenario',
        definition: ContentLibraryDisplayScenario,
        title: {
            NL: 'Demo van library content',
            EN: 'Demo of library content',
        },
    },
};

export function ProjectDrawer() {
    const { lang, languages, dict, setLang } = useLang();
    const open = useSelector(selectProjectDrawerOpen);
    const activeName = useSelector(selectActiveProjectName);
    const projects = useSelector(selectInactiveProjects);
    const dispatch = useDispatch();

    function close() {
        dispatch(GameActions.CLOSE_PROJECT_DRAWER());
    }

    const activateProject = (project: ProjectState) => {
        dispatch(GameActions.ACTIVATE_PROJECT({ id: project.id }));
        close();
    };

    const newProject = () => {
        const id = uuid();
        dispatch(GameActions.NEW_PROJECT({ id }));
        dispatch(GameActions.ACTIVATE_PROJECT({ id }));
        close();
    };

    const copyActiveProject = () => {
        const id = uuid();
        const name = formatL(dict.projectDrawer.copyOfX, [activeName]);

        dispatch(GameActions.COPY_ACTIVE_PROJECT({ id, name }));
        dispatch(GameActions.ACTIVATE_PROJECT({ id }));
        close();
    };

    const newFromTemplate = (templateId: string) => {
        const id = uuid();
        const template = templates[templateId];
        const name = template.title[lang];
        dispatch(GameActions.NEW_PROJECT({ id, name, definition: template.definition }));
        dispatch(GameActions.ACTIVATE_PROJECT({ id }));
        close();
    };

    function handleDelete(id: string) {
        const conf = confirm(dict.projectDrawer.msgConfirmDeleteProject);
        if (conf) {
            dispatch(GameActions.DELETE_PROJECT({ id }));
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
                <ListItemText primary={dict.projectDrawer.btnNewProject} />
            </ListItem>

            <ListItem button component={'label'}>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <RestorePage />
                </ListItemIcon>
                <ListItemText primary={dict.projectDrawer.btnLoadFromFile} />
                <HiddenFileInput onSelectFiles={handleFileUpload} />
            </ListItem>

            <ListSubheader>{dict.projectDrawer.titleActiveProject}</ListSubheader>
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
                <ListItemText primary={dict.projectDrawer.btnSaveToFile} />
            </ListItem>
            <ListItem button onClick={copyActiveProject}>
                <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                    <FileCopy />
                </ListItemIcon>
                <ListItemText primary={'Kopie maken'} />
            </ListItem>

            <ListSubheader>{dict.projectDrawer.titleSavedProjects}</ListSubheader>
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

            <ListSubheader>{dict.projectDrawer.titleTemplates}</ListSubheader>
            <List>
                {Object.entries(templates).map(([id, template]) => (
                    <ListItem key={id} button onClick={() => newFromTemplate(id)}>
                        <ListItemIcon style={{ minWidth: 0, marginRight: '.5em' }}>
                            <NoteAdd />
                        </ListItemIcon>
                        <ListItemText primary={template.title[lang]} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
