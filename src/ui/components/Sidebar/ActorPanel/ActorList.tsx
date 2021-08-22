import { Button, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../../../state/actions';
import { ProjectActions } from '../../../../state/project/actions';
import {
    selectEditing,
    selectHighlightedResource,
    selectIdsOfInvolvedActors,
    selectScenarioDef,
} from '../../../../state/selectors';
import { orderedMap } from '../../../../util/types/OrderedMap';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { ImageOrIconSwitch } from '../../elements/ImageOrIconSwitch';

export function ActorList() {
    const involvedActors = useSelector(selectIdsOfInvolvedActors);
    const scenarioDef = useSelector(selectScenarioDef);
    const editing = useSelector(selectEditing);
    const highlightedResource = useSelector(selectHighlightedResource);
    const { actors: actorMap } = scenarioDef;
    const actors = orderedMap.list(actorMap);

    const canRemoveActor = (id: string) => !(id in involvedActors);

    const { dict } = useLang();
    const { openDialog } = useDialog();

    const dispatch = useDispatch();
    const highlightResource = (id: string) => dispatch(GameActions.HIGHLIGHT_RESOURCE({ resourceId: id }));
    const unhighlightResource = (id: string) => dispatch(GameActions.UNHIGHLIGHT_RESOURCE({ resourceId: id }));
    const reorderActors = (fromIndex: number, toIndex: number) =>
        dispatch(ProjectActions.REORDER_ACTORS({ fromIndex, toIndex }));
    const removeActor = (id: string) => dispatch(ProjectActions.REMOVE_ACTOR({ id }));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h6">{dict.actorList.titleActors}</Typography>
                {editing && (
                    <Button variant={'outlined'} onClick={() => openDialog('AddActor', undefined)}>
                        <Add /> {dict.actorList.btnAddActor}
                    </Button>
                )}
            </div>

            {actors.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant={'body1'} style={{ marginBottom: '1rem' }}>
                        {dict.actorList.msgYouHaveNoActors}
                    </Typography>
                </div>
            ) : (
                <DragDropContext onDragEnd={(x) => reorderActors(x.source!.index, x.destination!.index)}>
                    <Droppable droppableId={'d123'}>
                        {(provided) => (
                            <List innerRef={provided.innerRef} {...provided.droppableProps}>
                                {actors.map((actor, i) => (
                                    <Draggable
                                        draggableId={actor.definition.id}
                                        index={i}
                                        key={actor.definition.id}
                                        isDragDisabled={!editing}
                                    >
                                        {(provided) => (
                                            <ListItem
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                innerRef={provided.innerRef}
                                                button
                                                selected={highlightedResource === actor.definition.id}
                                                onMouseEnter={() => highlightResource(actor.definition.id)}
                                                onMouseLeave={() => unhighlightResource(actor.definition.id)}
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

                                                {!editing ? (
                                                    ''
                                                ) : (
                                                    <Tooltip
                                                        title={
                                                            !canRemoveActor(actor.definition.id)
                                                                ? dict.actorList.msgFirstRemoveActionsOfActorX.replace(
                                                                      '{0}',
                                                                      actor.definition.name,
                                                                  )
                                                                : dict.actorList.hintRemoveActorX.replace(
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
                                                )}
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
