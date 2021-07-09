import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { AssetField } from '../../../../model/content/Common/View/AssetField';
import { useLang } from '../../../hooks/useLang';

export interface Props {
    props: AssetField;
    setField: (value: any) => void;
}

export function AssetFormControl({ props, setField }: Props) {
    const { lang } = useLang();
    const title = props.title[lang];
    const value = props.value;
    const assets = props.options;

    return (
        <FormControl fullWidth style={{ marginBottom: '1em' }}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} onChange={(e) => setField(e.target.value)}>
                {assets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                        {asset.title[lang]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
