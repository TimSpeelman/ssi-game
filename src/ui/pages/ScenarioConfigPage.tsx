import {
    Button,
    Container,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { default as React, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { actorImage } from '../../config/actorImage';
import { ActorConfig } from '../../model/game/Scenario';
import { ScenarioActions } from '../../state/scenario/actions';
import { selectInvolvedActors, selectScenarioConfiguration } from '../../state/scenario/selectors';
import { reorder } from '../../util/util';
import { ActorConfigDialog } from '../components/ActorPanel/ActorConfigDialog';
import { useNav } from '../hooks/useNav';

export function ScenarioConfigPage() {
    const dispatch = useDispatch();
    const { goto } = useNav();

    const involvedActors = useSelector(selectInvolvedActors);
    const originalConfig = useSelector(selectScenarioConfiguration);
    const [config, setConf] = useState(originalConfig);
    const { meta, actors } = config;

    // Meta Setters
    const setTitle = (title: string) => setConf((c) => ({ ...c, meta: { ...c.meta, title } }));
    const setAuthor = (author: string) => setConf((c) => ({ ...c, meta: { ...c.meta, author } }));
    const setBody = (body: string) => setConf((c) => ({ ...c, meta: { ...c.meta, body } }));

    // Actor Setters
    const canRemoveActor = (id: string) => !(id in involvedActors);
    const setActors = (actors: ActorConfig[]) => setConf((c) => ({ ...c, actors }));
    const handleReorder = (fromIndex: number, toIndex: number) => setActors(reorder(actors, fromIndex, toIndex));
    const removeActor = (id: string) => setActors(actors.filter((a) => a.definition.id !== id));
    const addActor = (actor: ActorConfig) =>
        setActors([...actors, { ...actor, definition: { ...actor.definition, id: uuid() } }]);

    const [editingActorId, editActor] = useState<string | undefined>(undefined);
    const [creatingActor, setCreatingActor] = useState(false);

    const save = () => {
        dispatch(ScenarioActions.SET_SCENARIO_CONFIG({ config }));
        goto('/');
    };

    const cancel = () => {
        goto('/');
    };

    const actorSubtitle = (actor: ActorConfig) =>
        `id:${actor.definition.id} ` +
        (actor.definition.type.isHuman ? (actor.definition.type.isMale ? 'Man' : 'Vrouw') : 'Organisatie') +
        ` np:${actor.definition.nounPhrase}`;

    return (
        <div>
            <ActorConfigDialog
                isCreate={false}
                open={!!editingActorId}
                actorConfig={actors.find((a) => a.definition.id === editingActorId)!}
                handleClose={() => editActor(undefined)}
                handleSubmit={(newActor) => {
                    setActors(
                        actors.map((usedActor) => (usedActor.definition.id === editingActorId! ? newActor : usedActor)),
                    );
                    editActor(undefined);
                }}
            />
            <ActorConfigDialog
                isCreate={true}
                open={creatingActor}
                handleClose={() => setCreatingActor(false)}
                handleSubmit={(newActor) => {
                    addActor(newActor);
                    setCreatingActor(false);
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
                        Sleep actoren om de volgorde te veranderen. Ze worden in deze volgorde met de klok mee op een
                        cirkel geplaatst.
                    </p>

                    <DragDropContext onDragEnd={(x) => handleReorder(x.source!.index, x.destination!.index)}>
                        <Droppable droppableId={'d123'}>
                            {(provided) => (
                                <List innerRef={provided.innerRef} {...provided.droppableProps}>
                                    {actors.map((actor, i) => (
                                        <Draggable
                                            draggableId={actor.definition.id}
                                            index={i}
                                            key={actor.definition.id}
                                        >
                                            {(provided) => (
                                                <ListItem
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    innerRef={provided.innerRef}
                                                >
                                                    <div
                                                        style={{
                                                            width: '3rem',
                                                            textAlign: 'center',
                                                            marginRight: '1rem',
                                                        }}
                                                    >
                                                        <img
                                                            src={actorImage(actor.definition.type.image)}
                                                            style={{ height: '3rem' }}
                                                        />
                                                    </div>
                                                    <ListItemText
                                                        primary={actor.definition.name}
                                                        secondary={actorSubtitle(actor)}
                                                    />

                                                    <Tooltip
                                                        title={
                                                            !canRemoveActor(actor.definition.id)
                                                                ? `Verwijder eerst alle acties waar ${actor.definition.name} in is betrokken.`
                                                                : `${actor.definition.name} verwijderen`
                                                        }
                                                    >
                                                        <span>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                disabled={!canRemoveActor(actor.definition.id)}
                                                                style={{ marginRight: '.5rem' }}
                                                                onClick={() => removeActor(actor.definition.id)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="edit"
                                                        onClick={() => editActor(actor.definition.id)}
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
                    <div style={{ textAlign: 'right' }}>
                        <Fab color={'primary'} onClick={() => setCreatingActor(true)}>
                            <AddIcon />
                        </Fab>
                    </div>
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
