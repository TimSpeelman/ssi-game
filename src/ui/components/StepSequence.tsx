import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Fragment, useState } from 'react';
import { actorImage } from '../../config/actorImage';
import { ScenarioStepDescription } from '../../data/scenario/Scenario';

export interface Props {
    steps: ScenarioStepDescription[];
    onInspect: (act?: string) => void;
    onDelete: (index: number) => void;
}

export function StepSequence(props: Props) {
    const [inspect, setInspect] = useState(-1);

    function handleMouseEnter(index: number) {
        setInspect(index);
        props.onInspect(props.steps[index].action.id);
    }

    function handleMouseExit(index: number) {
        if (inspect === index) {
            setInspect(-1);
            props.onInspect();
        }
    }

    return (
        <List>
            <Divider />
            {props.steps.map((step, i) => (
                <Fragment key={i}>
                    <ListItem
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseExit(i)}
                        selected={inspect === i}
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