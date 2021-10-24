import { Button, IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLang } from '../hooks/useLang';
import { TourStepState } from '../tour/TourStep';

export interface Props {
    step: TourStepState;
    index: number;
    numberOfSteps: number;
    highestIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
}
export function TourMessage({ step, index, numberOfSteps, highestIndex, ...p }: Props) {
    const { lang } = useLang();
    const isFirst = index === 0;
    const isLast = index === numberOfSteps - 1;

    const showNumberOfSteps = false;

    const indexDisplay =
        step.index === undefined
            ? ''
            : showNumberOfSteps
            ? `(${step.index + 1}/${highestIndex + 1})`
            : `${step.index + 1}.`;

    return (
        <div
            key={index}
            style={{
                position: 'fixed',
                left: 30,
                bottom: 30,
                width: 300,
                background: 'white',
                zIndex: 20000,
                padding: '1rem',
                boxShadow: '.5rem .5rem 1rem rgba(0,0,0,0.2)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {indexDisplay} {step.title[lang]}
                </Typography>
                <IconButton onClick={p.onClose}>
                    <Close />
                </IconButton>
            </div>
            <ReactMarkdown>{step.message[lang]}</ReactMarkdown>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {isFirst ? <div></div> : <Button onClick={p.onPrev}>Vorige</Button>}
                <Button onClick={p.onNext} color="primary" disabled={!step.nextEnabled}>
                    {isLast ? 'Sluiten' : 'Volgende'}
                </Button>
            </div>
        </div>
    );
}
