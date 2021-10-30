import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { AssetField } from '../../../model/content/Common/Props/AssetField';
import { useLang } from '../../hooks/useLang';

export interface Props {
    props: AssetField;
    setField: (value: any) => void;
}

export function AssetFormControl({ props, setField }: Props) {
    const { lang } = useLang();
    const title = props.title[lang];
    const value = props.value;
    const assets = props.options;
    const disabled = !!props.disabled;
    const disabledMsg = props.disabled ? props.disabled[lang] : '';
    const errorMsg = props.error ? props.error[lang] : null;

    const helperText = errorMsg ? errorMsg : (props.helperText || {})[lang];

    return (
        <FormControl
            fullWidth
            style={{ marginBottom: '1em' }}
            disabled={disabled}
            title={disabledMsg}
            error={!!errorMsg}
        >
            <InputLabel>
                {title}
                {props.required && '*'}
            </InputLabel>
            <Select value={value} onChange={(e) => setField(e.target.value)}>
                {assets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                        {asset.title[lang]}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
