import { Button, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { actorImage } from '../../../config/actorImage';
import { ActorConfig, ScenarioConfig } from '../../../model/game/Scenario';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectInvolvedActors, selectScenarioConfiguration } from '../../../state/scenario/selectors';
import { reorder } from '../../../util/util';
import { ActorConfigDialog } from './ActorConfigDialog';

export function ActorList() {
    const dispatch = useDispatch();
    const setConf = (config: ScenarioConfig) => dispatch(ScenarioActions.SET_SCENARIO_CONFIG({ config }));
    const involvedActors = useSelector(selectInvolvedActors);
    const originalConfig = useSelector(selectScenarioConfiguration);
    const { meta, actors } = originalConfig;

    // Actor Setters
    const canRemoveActor = (id: string) => !(id in involvedActors);
    const setActors = (actors: ActorConfig[]) => setConf({ ...originalConfig, actors });
    const handleReorder = (fromIndex: number, toIndex: number) => setActors(reorder(actors, fromIndex, toIndex));
    const removeActor = (id: string) => setActors(actors.filter((a) => a.definition.id !== id));
    const addActor = (actor: ActorConfig) =>
        setActors([...actors, { ...actor, definition: { ...actor.definition, id: uuid() } }]);

    const actorSubtitle = (actor: ActorConfig) =>
        `id:${actor.definition.id} ` +
        (actor.definition.type.isHuman ? (actor.definition.type.isMale ? 'Man' : 'Vrouw') : 'Organisatie') +
        ` np:${actor.definition.nounPhrase}`;

    const [creatingActor, setCreatingActor] = useState(false);

    return (
        <div>
            <ActorConfigDialog
                isCreate={true}
                open={creatingActor}
                handleClose={() => setCreatingActor(false)}
                handleSubmit={(newActor) => {
                    addActor(newActor);
                    setCreatingActor(false);
                }}
            />

            <Typography variant="h6">Actoren ({actors.length})</Typography>
            <DragDropContext onDragEnd={(x) => handleReorder(x.source!.index, x.destination!.index)}>
                <Droppable droppableId={'d123'}>
                    {(provided) => (
                        <List innerRef={provided.innerRef} {...provided.droppableProps}>
                            {actors.map((actor, i) => (
                                <Draggable draggableId={actor.definition.id} index={i} key={actor.definition.id}>
                                    {(provided) => (
                                        <ListItem
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            innerRef={provided.innerRef}
                                            button
                                            onClick={() =>
                                                dispatch(ScenarioActions.SELECT_ACTOR({ id: actor.definition.id }))
                                            }
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
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
            <Button variant={'outlined'} onClick={() => setCreatingActor(true)}>
                <Add /> Actor Toevoegen
            </Button>
        </div>
    );
}
