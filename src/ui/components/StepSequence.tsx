import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Fragment, useState } from 'react';
import { actorImage } from '../../config/actorImage';
import { ScenarioStepDescription } from '../../data/scenario/Scenario';

export interface Props {
    steps: ScenarioStepDescription[];
    activeStepIndex: number;
    stepIsSelected: boolean;
    onInspect: (act?: string) => void;
    onDelete: (index: number) => void;
}

export function StepSequence(props: Props) {
    const [hover, setHover] = useState(-2);

    function handleMouseEnter(index: number) {
        setHover(index);
        // props.onInspect(props.steps[index].action.id);
    }

    function handleMouseExit(index: number) {
        if (hover === index) {
            setHover(-2);
            // props.onInspect();
        }
    }

    function handleClick(index: number) {
        // toggle
        props.onInspect(
            props.activeStepIndex === index && props.stepIsSelected ? undefined : props.steps[index].action.id,
        );
    }

    return (
        <List style={{ padding: '1rem' }}>
            <Divider />
            <ListItem
                className={props.activeStepIndex < 0 ? 'active-step' : ''}
                onMouseEnter={() => handleMouseEnter(-1)}
                onMouseLeave={() => handleMouseExit(-1)}
                onClick={() => props.onInspect(undefined)}
                selected={hover === -1}
            >
                <ListItemText primary={'START'} />
            </ListItem>

            {props.steps.map((step, i) => (
                <Fragment key={i}>
                    <ListItem
                        className={props.activeStepIndex === i ? 'active-step' : ''}
                        onClick={() => handleClick(i)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseExit(i)}
                        selected={hover === i || (props.activeStepIndex === i && props.stepIsSelected)}
                    >
                        <img src={actorImage(step.action.from.image)} style={{ height: '3rem' }} />
                        <i className="fas fa-chevron-right"></i>
                        <img src={actorImage(step.action.to.image)} style={{ height: '3rem' }} />
                        <ListItemText primary={step.action.description} secondary={step.action.sub} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => props.onDelete(i)}>
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
