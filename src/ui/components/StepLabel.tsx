import { IconButton, ListItem, ListItemProps, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { actorImage } from '../../config/actorImage';
import { ScenarioStepDescription } from '../../model/view/ScenarioStepDescription';

export interface Props extends ListItemProps {
    step: ScenarioStepDescription;
    onDelete?: () => void;
}

export function StepLabel({ step, onDelete, ...props }: Props) {
    return (
        <ListItem {...(props as any)}>
            <img src={actorImage(step.action.from.image)} style={{ height: '3rem' }} />
            <i className="fas fa-chevron-right"></i>
            <img src={actorImage(step.action.to.image)} style={{ height: '3rem' }} />
            <ListItemText primary={step.action.description} secondary={step.action.sub} />
            {onDelete && (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
}
