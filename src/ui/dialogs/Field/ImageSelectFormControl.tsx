import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { ImageSelectField } from '../../../model/content/Common/View/ImageSelectField';
import { ImageOrIconDefinition } from '../../../model/description/ImageOrIconDefinition';
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

    return (
        <FormControl fullWidth style={{ marginBottom: '1em' }}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} onChange={(e) => setField(e.target.value)}>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {imageOrIcon(option.image)} {option.title && option.title[lang]}
                    </MenuItem>
                ))}
            </Select>
            {props.helperText && <FormHelperText>{props.helperText[lang]}</FormHelperText>}
        </FormControl>
    );
}
