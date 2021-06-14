import { Button, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Add, Group } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { ScenarioActions } from '../../../../state/scenario/actions';
import { selectActiveStepId, selectStepDescs, selectUsedActors } from '../../../../state/scenario/selectors';
import { useDialog } from '../../../dialogs/dialogs';
import { SidebarTab } from '../SidebarTab';

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

    const { openDialog } = useDialog();

    return (
        <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="h6">Stappen ({steps.length})</Typography>
                <Button variant={'outlined'} onClick={() => openDialog('AddStep', undefined)}>
                    {' '}
                    <Add /> Stap Toevoegen
                </Button>
            </div>
            {steps.length === 0 &&
                (usedActors.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant={'body1'} style={{ marginBottom: '1rem' }}>
                            Je hebt nog geen actoren. Voordat je je scenario kunt opbouwen moet je eerst actoren
                            toevoegen.
                        </Typography>
                        <Button
                            variant={'outlined'}
                            onClick={() => dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }))}
                        >
                            {' '}
                            <Group /> Naar Actoren
                        </Button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant={'body1'}>
                            Je hebt nog geen stappen. Voeg stappen toe om een scenario te beschrijven.
                        </Typography>
                    </div>
                ))}
            {steps.length > 0 && (
                <DragDropContext onDragEnd={(x) => handleReorder(x.source!.index, x.destination!.index)}>
                    <Droppable droppableId={'d123'}>
                        {(provided) => (
                            <List innerRef={provided.innerRef} {...provided.droppableProps}>
                                <ListItem
                                    className={classNames({
                                        'step-item': true,
                                        'step-active': activeStepId === undefined,
                                    })}
                                    onClick={() => handleClick(undefined)}
                                    button
                                    style={{ textAlign: 'center' }}
                                >
                                    {/* <div style={{ width: '6rem' }} /> */}
                                    <ListItemText primary={'Begintoestand'} />
                                </ListItem>

                                {steps.map((step, i) => (
                                    <Draggable draggableId={step.action.id} index={i} key={step.action.id}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                // button
                                                className={classNames({
                                                    'step-item': true,
                                                    'step-active': activeStepId === step.action.id,
                                                    'step-success': step.success,
                                                    'step-failed': !step.success,
                                                    'step-inactive': !step.active,
                                                })}
                                                onClick={() => handleClick(step.action.id)}
                                            >
                                                {/* <strong style={{ marginRight: '1rem' }}>Stap </strong> */}
                                                <div style={{ width: '3rem', flexShrink: 0, flexGrow: 0 }}>
                                                    <img
                                                        src={actorImage(step.action.from.image)}
                                                        style={{ height: '3rem', margin: '0 auto' }}
                                                    />
                                                </div>
                                                {/* <div
                                                style={{
                                                    width: '1rem',
                                                    textAlign: 'center',
                                                    flexShrink: 0,
                                                    flexGrow: 0,
                                                }}
                                            >
                                                <i className="fas fa-chevron-right"></i>
                                            </div> */}

                                                <div style={{ width: '3rem', flexGrow: 0, flexShrink: 0 }}>
                                                    <img
                                                        src={actorImage(step.action.to.image)}
                                                        style={{ height: '3rem', margin: '0 auto' }}
                                                    />
                                                </div>

                                                <div style={{ flexGrow: 1, marginLeft: '.5rem' }}>
                                                    <strong>Stap {i + 1}. </strong>
                                                    <br />
                                                    {step.action.description}
                                                </div>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        dispatch(ScenarioActions.REMOVE_STEP({ id: step.action.id }))
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
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
