import {
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { default as React, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../config/actorImage';
import { ActorState } from '../../model/view/ActorState';
import { ScenarioActions } from '../../state/scenario/actions';
import { selectScenarioConfiguration, selectUnusedActors } from '../../state/scenario/selectors';
import { useNav } from '../hooks/useNav';
import { ActorConfigDialog } from './ActorConfigDialog';

export function ScenarioConfigPage() {
    const dispatch = useDispatch();
    const { goto } = useNav();

    const originalConfig = useSelector(selectScenarioConfiguration);
    const [config, setConf] = useState(originalConfig);
    const { meta, actors } = config;

    // Meta Setters
    const setTitle = (title: string) => setConf((c) => ({ ...c, meta: { ...c.meta, title } }));
    const setAuthor = (author: string) => setConf((c) => ({ ...c, meta: { ...c.meta, author } }));
    const setBody = (body: string) => setConf((c) => ({ ...c, meta: { ...c.meta, body } }));

    // Actor Setters
    const setActors = (actors: ActorState[]) => setConf((c) => ({ ...c, actors }));
    const handleReorder = (fromIndex: number, toIndex: number) => undefined;
    const removeActor = (id: string) => setActors(actors.filter((a) => a.actor.id !== id));

    const [editingActorId, editActor] = useState<string | undefined>(undefined);

    const save = () => {
        dispatch(ScenarioActions.SET_SCENARIO_CONFIG({ config }));
        goto('/');
    };

    const cancel = () => {
        goto('/');
    };

    const unusedActors = useSelector(selectUnusedActors);

    const actorSubtitle = (actor: ActorState) =>
        actor.actor.isHuman ? (actor.actor.isMale ? 'Man' : 'Vrouw') : 'Organisatie';

    return (
        <div>
            <ActorConfigDialog
                open={!!editingActorId}
                actorState={actors.find((a) => a.actor.id === editingActorId)!}
                handleClose={() => editActor(undefined)}
                handleSubmit={(newActor) => {
                    setActors(
                        actors.map((usedActor) => (usedActor.actor.id === editingActorId! ? newActor : usedActor)),
                    );
                    editActor(undefined);
                }}
            />
            <Container style={{ paddingTop: '1rem' }}>
                <Typography variant={'h3'}>Scenario-instellingen</Typography>
                <Paper style={{ marginBottom: '1rem', padding: '1rem' }}>
                    <Typography variant={'h5'}>Algemeen</Typography>
                    <p style={{ marginBottom: '1rem' }}>Geef het scenario een titel, omschrijving en auteur.</p>

                    <TextField
                        fullWidth
                        label={'Titel'}
                        value={meta.title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                    <TextField
                        fullWidth
                        label={'Auteur'}
                        value={meta.author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label={'Omschrijving'}
                        value={meta.body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                </Paper>
                <Paper style={{ padding: '1rem' }}>
                    <Typography variant={'h5'}>Actoren ({actors.length})</Typography>
                    <p style={{ marginBottom: '1em' }}>
                        Voeg actoren toe en stel in met welke gegevens, kenmerken en andere zaken die actoren beginnen.
                    </p>

                    <DragDropContext onDragEnd={(x) => handleReorder(x.source!.index, x.destination!.index)}>
                        <Droppable droppableId={'d123'}>
                            {(provided) => (
                                <List innerRef={provided.innerRef} {...provided.droppableProps}>
                                    {actors.map((actor, i) => (
                                        <Draggable draggableId={actor.actor.id} index={i} key={actor.actor.id}>
                                            {(provided) => (
                                                <ListItem
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    innerRef={provided.innerRef}
                                                    button
                                                >
                                                    <div
                                                        style={{
                                                            width: '3rem',
                                                            textAlign: 'center',
                                                            marginRight: '1rem',
                                                        }}
                                                    >
                                                        <img
                                                            src={actorImage(actor.actor.image)}
                                                            style={{ height: '3rem' }}
                                                        />
                                                    </div>
                                                    <ListItemText
                                                        primary={actor.actor.name}
                                                        secondary={actorSubtitle(actor)}
                                                    />

                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        style={{ marginRight: '.5rem' }}
                                                        onClick={() => removeActor(actor.actor.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="edit"
                                                        onClick={() => editActor(actor.actor.id)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <ListItemSecondaryAction />
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                </List>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Paper>
                <Button color="primary" variant="contained" onClick={save}>
                    Opslaan
                </Button>
                <Button color="default" variant="outlined" onClick={cancel}>
                    Annuleren
                </Button>
            </Container>
        </div>
    );
}
