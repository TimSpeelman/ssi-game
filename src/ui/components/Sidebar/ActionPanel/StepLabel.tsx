import { Card, ListItemProps, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { StepDesc } from '../../../../model/description/Step/StepDesc';
import { selectLang } from '../../../../state/selectors';
import { ImageOrIconSwitch } from '../../elements/ImageOrIconSwitch';
import { replaceInternalResourceUrlStrings } from '../../elements/replaceInternalResourceUrlStrings';

export interface Props extends ListItemProps {
    step: StepDesc;
}

export function StepLabel({ step, ...props }: Props) {
    const lang = useSelector(selectLang);

    return (
        <Card style={{ marginBottom: '1rem' }} className="step-label">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    background: '#eee',
                    padding: '1rem',
                    borderBottom: '1px solid #ccc',
                }}
            >
                <ImageOrIconSwitch
                    image={step.action.from.image}
                    stylesPerType={{
                        'fa-icon': { fontSize: '5rem' },
                        image: { height: '5rem' },
                    }}
                />
                <ImageOrIconSwitch
                    image={step.action.to.image}
                    stylesPerType={{
                        'fa-icon': { fontSize: '5rem' },
                        image: { height: '5rem' },
                    }}
                />
            </div>
            <div style={{ padding: '1em' }}>
                <Typography variant="h6">{step.action.title[lang]}</Typography>

                {/* Additional explanation */}
                {step.action.long && (
                    <Typography variant="body1" style={{ fontWeight: 300 }}>
                        {replaceInternalResourceUrlStrings(step.action.long[lang])}
                    </Typography>
                )}

                {/* Custom explanation */}
                {step.action.explanation && (
                    <Typography variant="body1" style={{ fontWeight: 300, marginTop: '1em' }}>
                        {step.action.explanation}
                    </Typography>
                )}
            </div>
        </Card>
    );
}
