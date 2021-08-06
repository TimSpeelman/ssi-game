import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { ActorField } from '../../../model/content/Common/View/ActorField';
import { ImageOrIconSwitch } from '../../components/ImageOrIconSwitch';
import { useLang } from '../../hooks/useLang';

export interface Props {
    props: ActorField;
    setField: (value: any) => void;
}

export function ActorFormControl({ props, setField }: Props) {
    const { lang } = useLang();
    const title = props.title[lang];
    const value = props.value;
    const actors = props.options;

    return (
        <FormControl fullWidth style={{ marginBottom: '1em' }}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} onChange={(e) => setField(e.target.value)}>
                {actors.map((actor) => (
                    <MenuItem key={actor.id} value={actor.id}>
                        <ImageOrIconSwitch
                            image={actor.img}
                            stylesPerType={{
                                'fa-icon': { fontSize: '2rem' },
                                image: { height: '2rem' },
                            }}
                        />
                        {actor.name}
                    </MenuItem>
                ))}
            </Select>
            {props.helperText && <FormHelperText>{props.helperText[lang]}</FormHelperText>}
        </FormControl>
    );
}
