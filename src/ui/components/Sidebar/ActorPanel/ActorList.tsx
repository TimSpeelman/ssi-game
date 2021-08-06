import { Button, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ActorConfig } from '../../../../model/definition/Actor/ActorConfig';
import { GameActions } from '../../../../state/actions';
import { ProjectActions } from '../../../../state/project/actions';
import { selectHighlightedResource, selectIdsOfInvolvedActors, selectScenarioDef } from '../../../../state/selectors';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { ImageOrIconSwitch } from '../../elements/ImageOrIconSwitch';

export function ActorList() {
    const dispatch = useDispatch();
    const involvedActors = useSelector(selectIdsOfInvolvedActors);
    const scenarioDef = useSelector(selectScenarioDef);
    const { openDialog } = useDialog();
    const { meta, actors } = scenarioDef;

    const highlightedResource = useSelector(selectHighlightedResource);
    const onMouseEnter = (id: string) => dispatch(GameActions.HIGHLIGHT_RESOURCE({ resourceId: id }));
    const onMouseLeave = (id: string) => dispatch(GameActions.UNHIGHLIGHT_RESOURCE({ resourceId: id }));

    // Actor Setters
    const canRemoveActor = (id: string) => !(id in involvedActors);
    const setActors = (actors: ActorConfig[]) => dispatch(ProjectActions.SET_ACTORS({ actors }));
    const handleReorder = (sourceIndex: number, targetIndex: number) =>
        sourceIndex !== targetIndex && dispatch(ProjectActions.REORDER_ACTORS({ sourceIndex, targetIndex }));
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
                                                selected={highlightedResource === actor.definition.id}
                                                onMouseEnter={() => onMouseEnter(actor.definition.id)}
                                                onMouseLeave={() => onMouseLeave(actor.definition.id)}
                                                onClick={() =>
                                                    dispatch(ProjectActions.SELECT_ACTOR({ id: actor.definition.id }))
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
                                                    <ImageOrIconSwitch
                                                        image={actor.definition.type.image}
                                                        stylesPerType={{
                                                            'fa-icon': { fontSize: '3rem' },
                                                            image: { height: '3rem' },
                                                        }}
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
