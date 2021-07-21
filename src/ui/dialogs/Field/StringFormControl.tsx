import { TextField } from '@material-ui/core';
import React from 'react';
import { StringField } from '../../../model/content/Common/View/StringField';
import { useLang } from '../../hooks/useLang';

export interface Props {
    props: StringField;
    setField: (value: any) => void;
}

export function StringFormControl({ props, setField }: Props) {
    const { lang } = useLang();
    const title = props.title[lang];
    const value = props.value;

    return (
        <TextField
            style={{ marginBottom: '1em' }}
            margin="dense"
            multiline={props.multiline}
            label={title}
            value={value}
            onChange={(e) => setField(e.target.value)}
            fullWidth
            helperText={props.helperText ? props.helperText[lang] : undefined}
        />
    );
}
