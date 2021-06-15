import { Button, ListItemProps, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { actorImage } from '../../../../config/actorImage';
import { StepDesc } from '../../../../model/description/Step/StepDesc';
import { selectLang } from '../../../../state/scenario/selectors';

export interface Props extends ListItemProps {
    step: StepDesc;
    onEdit: () => void;
}

export function StepLabel({ step, onEdit, ...props }: Props) {
    const lang = useSelector(selectLang);

    return (
        <div
            style={{
                display: 'flex',
                marginTop: '1rem',
                alignItems: 'center',
                justifyContent: 'stretch',
                background: '#eee',
            }}
        >
            <div style={{ width: '3rem', textAlign: 'center', flexShrink: 0, marginRight: '1rem' }}>
                <img src={actorImage(step.action.from.image)} style={{ height: '3rem' }} />
                <img src={actorImage(step.action.to.image)} style={{ height: '3rem' }} />
            </div>
            <div style={{ flexGrow: 1 }}>
                <Typography variant="h6">{step.action.description[lang]}</Typography>
                <Typography variant="subtitle2">{step.action.sub[lang]}</Typography>
            </div>
            <Button onClick={() => onEdit()}>
                <Edit />
            </Button>
        </div>
    );
}
