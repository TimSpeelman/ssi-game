import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../config/actorImage';
import { ScenarioActions } from '../../state/scenario/actions';
import { selectActiveStepId, selectSelectedStepId, selectSteps } from '../../state/scenario/selectors';

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

    return (
        <List style={{ padding: '1rem' }}>
            <Divider />
            <ListItem
                className={activeStepId === undefined ? 'active-step' : ''}
                onClick={() => handleClick(undefined)}
            >
                <ListItemText primary={'START'} />
            </ListItem>

            {steps.map((step, i) => (
                <Fragment key={i}>
                    <ListItem
                        button
                        className={classNames({
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
                        <ListItemText primary={`${i + 1}. ${step.action.description}`} secondary={step.action.sub} />

                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => dispatch(ScenarioActions.REMOVE_STEP({ id: step.action.id }))}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
}
