import {
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectActiveStepId, selectStepDescs, selectUsedActors } from '../../../../state/scenario/selectors';
import { StepDialog } from './StepDialog';

export function StepSequence() {
    const steps = useSelector(selectStepDescs);
    const activeStepId = useSelector(selectActiveStepId);
    const dispatch = useDispatch();
    const usedActors = useSelector(selectUsedActors);

    function handleClick(id: string | undefined) {
        if (id === undefined) {
            dispatch(ScenarioActions.CLEAR_SELECTION());
        } else {
            dispatch(ScenarioActions.SELECT_STEP({ id }));
        }
        dispatch(ScenarioActions.GOTO_STEP({ id }));
    }

    function handleReorder(sourceIndex: number, targetIndex: number) {
        dispatch(ScenarioActions.REORDER_STEP({ sourceIndex, targetIndex }));
    }

    const [creating, setCreating] = useState(false);

    return (
        <div style={{ padding: '1rem' }}>
            <StepDialog
                open={creating}
                isCreate={true}
                onSubmit={(step) => {
                    dispatch(ScenarioActions.ADD_STEP({ step }));
                    setCreating(false);
                }}
                onCancel={() => setCreating(false)}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Stappen ({steps.length})</Typography>
                <Button variant={'outlined'} onClick={() => setCreating(true)}>
                    {' '}
                    <Add /> Stap Toevoegen
                </Button>
            </div>
            <DragDropContext onDragEnd={(x) => handleReorder(x.source!.index, x.destination!.index)}>
                <Droppable droppableId={'d123'}>
                    {(provided) => (
                        <List innerRef={provided.innerRef} {...provided.droppableProps}>
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
                                                'step-success': step.success,
                                                'step-failed': !step.success,
                                                'step-inactive': !step.active,
                                            })}
                                            onClick={() => handleClick(step.action.id)}
                                            selected={activeStepId === step.action.id}
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
        </div>
    );
}
