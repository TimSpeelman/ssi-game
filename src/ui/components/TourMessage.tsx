import { Button, Typography } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLang } from '../hooks/useLang';
import { TourStepState } from '../tour/TourStep';

export interface Props {
    step: TourStepState;
    index: number;
    numberOfSteps: number;
    onNext: () => void;
    onPrev: () => void;
}
export function TourMessage({ step, index, numberOfSteps, ...p }: Props) {
    const { lang } = useLang();
    return (
        <div
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
            <Typography variant="h6">
                ({index + 1}/{numberOfSteps}) {step.title[lang]}
            </Typography>
            <ReactMarkdown>{step.message[lang]}</ReactMarkdown>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={p.onPrev}>Vorige</Button>
                <Button onClick={p.onNext} color="primary" disabled={!step.nextEnabled}>
                    Volgende
                </Button>
            </div>
        </div>
    );
}
