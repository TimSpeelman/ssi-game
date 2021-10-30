import { TextField } from '@material-ui/core';
import React from 'react';
import { StringField } from '../../../model/content/Common/Props/StringField';
import { useLang } from '../../hooks/useLang';

export interface Props {
    props: StringField;
    setField: (value: any) => void;
}

export function StringFormControl({ props, setField }: Props) {
    const { lang } = useLang();
    const title = props.title[lang];
    const value = props.value;
    const errorMsg = props.error ? props.error[lang] : null;

    return (
        <TextField
            style={{ marginBottom: '1em' }}
            margin="dense"
            multiline={props.multiline}
            label={title + (props.required ? '*' : '')}
            value={value}
            error={!!errorMsg}
            onChange={(e) => setField(e.target.value)}
            fullWidth
            helperText={!!errorMsg ? errorMsg : props.helperText ? props.helperText[lang] : undefined}
        />
    );
}
