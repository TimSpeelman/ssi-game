import { Button, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { ActorConfig } from '../../../../model/definition/Actor/ActorConfig';
import { ScenarioDef } from '../../../../model/definition/ScenarioDef';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectIdsOfInvolvedActors, selectScenarioDef } from '../../../../state/scenario/selectors';
import { reorder } from '../../../../util/util';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';

export function ActorList() {
    const dispatch = useDispatch();
    const setConf = (scenario: ScenarioDef) => dispatch(ScenarioActions.SET_SCENARIO({ scenario }));
    const involvedActors = useSelector(selectIdsOfInvolvedActors);
    const scenarioDef = useSelector(selectScenarioDef);
    const { openDialog } = useDialog();
    const { meta, actors } = scenarioDef;

    // Actor Setters
    const canRemoveActor = (id: string) => !(id in involvedActors);
    const setActors = (actors: ActorConfig[]) => setConf({ ...scenarioDef, actors });
    const handleReorder = (fromIndex: number, toIndex: number) => setActors(reorder(actors, fromIndex, toIndex));
    const removeActor = (id: string) => setActors(actors.filter((a) => a.definition.id !== id));
    const { dict } = useLang();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h6">
                    {dict.titleActors} ({actors.length})
                </Typography>
                <Button variant={'outlined'} onClick={() => openDialog('AddActor', undefined)}>
                    <Add /> {dict.btnAddActor}
                </Button>
            </div>

            {actors.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant={'body1'} style={{ marginBottom: '1rem' }}>
                        {dict.actorList_msgYouHaveNoActors}
                    </Typography>
                </div>
            ) : (
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
                                                        flexGrow: 0,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <img
                                                        src={actorImage(actor.definition.type.image)}
                                                        style={{ height: '3rem' }}
                                                    />
                                                </div>
                                                <ListItemText
                                                    primary={actor.definition.name}
                                                    secondary={actor.definition.description}
                                                />

                                                <Tooltip
                                                    title={
                                                        !canRemoveActor(actor.definition.id)
                                                            ? dict.actorList_msgFirstRemoveActionsOfActorX.replace(
                                                                  '{0}',
                                                                  actor.definition.name,
                                                              )
                                                            : dict.actorList_hintRemoveActorX.replace(
                                                                  '{0}',
                                                                  actor.definition.name,
                                                              )
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
            )}
        </div>
    );
}
