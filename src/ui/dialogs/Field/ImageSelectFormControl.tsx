import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { ImageSelectField } from '../../../model/content/Common/View/ImageSelectField';
import { useLang } from '../../hooks/useLang';

export interface Props {
    props: ImageSelectField;
    setField: (value: any) => void;
}

export function ImageSelectFormControl({ props, setField }: Props) {
    const { lang } = useLang();
    const title = props.title[lang];
    const value = props.value;
    const options = props.options;

    return (
        <FormControl fullWidth style={{ marginBottom: '1em' }}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} onChange={(e) => setField(e.target.value)}>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        <img src={option.imageUrl} style={{ height: '2rem' }} /> {option.title && option.title[lang]}
                    </MenuItem>
                ))}
            </Select>
            {props.helperText && <FormHelperText>{props.helperText[lang]}</FormHelperText>}
        </FormControl>
    );
}
