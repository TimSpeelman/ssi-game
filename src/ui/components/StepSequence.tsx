import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actorImage } from '../../config/actorImage';
import { ScenarioActions } from '../../state/scenario/actions';
import { selectActiveStepId, selectSelectedStepId, selectSteps } from '../../state/scenario/selectors';

export function StepSequence() {
    const steps = useSelector(selectSteps);
    const activeStepId = useSelector(selectActiveStepId);
    const selectedStepId = useSelector(selectSelectedStepId);
    const dispatch = useDispatch();

    const [hover, setHover] = useState(-2);

    function handleMouseEnter(index: number) {
        // todo move to CSS
        setHover(index);
    }

    function handleMouseExit(index: number) {
        // todo move to CSS
        if (hover === index) {
            setHover(-2);
        }
    }

    function handleClick(id: string) {
        if (selectedStepId === id) {
            dispatch(ScenarioActions.CLEAR_SELECTION());
        } else {
            dispatch(ScenarioActions.SELECT_STEP({ id }));
            dispatch(ScenarioActions.GOTO_STEP({ id }));
        }
    }

    return (
        <List style={{ padding: '1rem' }}>
            <Divider />
            <ListItem
                className={activeStepId === undefined ? 'active-step' : ''}
                onMouseEnter={() => handleMouseEnter(-1)}
                onMouseLeave={() => handleMouseExit(-1)}
                onClick={() => dispatch(ScenarioActions.CLEAR_SELECTION())}
                selected={hover === -1}
            >
                <ListItemText primary={'START'} />
            </ListItem>

            {steps.map((step, i) => (
                <Fragment key={i}>
                    <ListItem
                        className={activeStepId === step.action.id ? 'active-step' : ''}
                        onClick={() => handleClick(step.action.id)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseExit(i)}
                        selected={hover === i || selectedStepId === step.action.id}
                    >
                        <img src={actorImage(step.action.from.image)} style={{ height: '3rem' }} />
                        <i className="fas fa-chevron-right"></i>
                        <img src={actorImage(step.action.to.image)} style={{ height: '3rem' }} />
                        <ListItemText primary={step.action.description} secondary={step.action.sub} />
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
