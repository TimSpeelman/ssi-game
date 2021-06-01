import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../config/actorImage';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectActiveStepId, selectSelectedStepId, selectSteps } from '../../../state/scenario/selectors';
export function StepSequence() {
    const steps = useSelector(selectSteps);
    const activeStepId = useSelector(selectActiveStepId);
    const selectedStepId = useSelector(selectSelectedStepId);
    const dispatch = useDispatch();

    function handleClick(id: string | undefined) {
        if (selectedStepId === id) {
            dispatch(ScenarioActions.CLEAR_SELECTION());
        } else {
            if (id === undefined) {
                dispatch(ScenarioActions.CLEAR_SELECTION());
            } else {
                dispatch(ScenarioActions.SELECT_STEP({ id }));
            }
            dispatch(ScenarioActions.GOTO_STEP({ id }));
        }
    }

    function handleReorder(sourceIndex: number, targetIndex: number) {
        dispatch(ScenarioActions.REORDER_STEP({ sourceIndex, targetIndex }));
    }

    return (
        <DragDropContext onDragEnd={(x) => handleReorder(x.source!.index, x.destination!.index)}>
            <Droppable droppableId={'d123'}>
                {(provided) => (
                    <List style={{ padding: '1rem' }} innerRef={provided.innerRef} {...provided.droppableProps}>
                        <Divider />
                        <ListItem
                            className={activeStepId === undefined ? 'active-step' : ''}
                            onClick={() => handleClick(undefined)}
                        >
                            <ListItemText primary={'START'} />
                        </ListItem>

                        {steps.map((step, i) => (
                            <Draggable draggableId={step.action.id} index={i} key={step.action.id}>
                                {(provided) => (
                                    <ListItem
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        innerRef={provided.innerRef}
                                        button
                                        className={classNames({
                                            'step-item': true,
                                            'active-step': activeStepId === step.action.id,
                                            'step-success': step.success,
                                            'step-failed': !step.success,
                                            'step-inactive': !step.active,
                                        })}
                                        onClick={() => handleClick(step.action.id)}
                                        selected={selectedStepId === step.action.id}
                                    >
                                        <img src={actorImage(step.action.from.image)} style={{ height: '3rem' }} />
                                        <i className="fas fa-chevron-right"></i>
                                        <img src={actorImage(step.action.to.image)} style={{ height: '3rem' }} />
                                        <ListItemText
                                            primary={`${i + 1}. ${step.action.description}`}
                                            secondary={step.action.sub}
                                        />

                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                dispatch(ScenarioActions.REMOVE_STEP({ id: step.action.id }))
                                            }
                                        >
                                            <DeleteIcon />
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
    );
}
