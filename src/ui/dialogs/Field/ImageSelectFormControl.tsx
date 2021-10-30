import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { ImageOrIconDefinition } from '../../../model/common/ImageOrIconDefinition';
import { ImageSelectField } from '../../../model/content/Common/Props/ImageSelectField';
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

    const imageOrIcon = (image: ImageOrIconDefinition) =>
        image.type === 'fa-icon' ? (
            <i className={`fas fa-${image.name}`}></i>
        ) : (
            <img src={image.url} style={{ height: '2rem' }} />
        );
    const errorMsg = props.error ? props.error[lang] : null;

    const helperText = errorMsg ? errorMsg : (props.helperText || {})[lang];
    return (
        <FormControl fullWidth style={{ marginBottom: '1em' }} error={!!errorMsg}>
            <InputLabel>
                {title}
                {props.required && '*'}
            </InputLabel>
            <Select value={value} onChange={(e) => setField(e.target.value)}>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {imageOrIcon(option.image)} {option.title && option.title[lang]}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
