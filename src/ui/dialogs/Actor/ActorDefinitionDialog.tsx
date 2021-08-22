import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import { lens } from 'lens.ts';
import React, { Fragment, useEffect, useState } from 'react';
import { DefaultLibrary } from '../../../content';
import { ActorDef } from '../../../model/definition/Actor/ActorDef';
import { ActorType } from '../../../model/definition/Actor/ActorType';
import { ImageOrIconSwitch } from '../../components/elements/ImageOrIconSwitch';
import { useLang } from '../../hooks/useLang';

export interface Props {
    definition?: ActorDef;
    handleClose: () => void;
    handleSubmit: (actor: ActorDef) => void;
    isCreate: boolean;
}

const actorTypes = DefaultLibrary.actors;

const defaults: ActorDef = {
    id: '',
    type: Object.values(actorTypes)[0],
    name: '',
    nounPhrase: '',
    properties: [],
};

const L = lens<ActorDef>();

export function ActorDefinitionDialog(props: Props) {
    const [def, setDef] = useState(defaults);
    useEffect(() => (props.definition ? setDef(props.definition) : setDef(defaults)), [props.definition]);

    const setType = (actorType: ActorType) => setDef(L.type.set(actorType));
    const setName = (name: string) => setDef(L.set((m) => ({ ...m, name, nounPhrase: name })));
    const setDesc = (description: string) => setDef(L.description!.set(description));

    const { dict } = useLang();

    const save = () => {
        const L = lens<ActorDef>();
        const typeName = L.type.typeName.get()(def);
        const withName = L.name.set((n) => (n ? n : typeName))(def);
        const name = L.name.get()(withName);
        const withNounPhrase = L.nounPhrase.set((n) => (n ? n : name))(withName);
        props.handleSubmit(withNounPhrase);
    };

    const cancel = () => {
        props.handleClose();
    };

    return (
        <Fragment>
            <DialogTitle>
                {props.isCreate
                    ? dict.actorDefinitionDialog.titleCreateActor
                    : dict.actorDefinitionDialog.titleEditActor}
            </DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>

                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel>{dict.actorDefinitionDialog.labelActorType}</InputLabel>
                    <Select
                        fullWidth
                        value={def.type}
                        onChange={(e) => setType(actorTypes[e.target.value as keyof typeof actorTypes])}
                        renderValue={(a: ActorType) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    style={{
                                        width: '3rem',
                                        textAlign: 'center',
                                        marginRight: '1rem',
                                    }}
                                >
                                    <ImageOrIconSwitch
                                        image={a.image}
                                        stylesPerType={{
                                            'fa-icon': { fontSize: '3rem' },
                                            image: { height: '3rem' },
                                        }}
                                    />
                                </div>
                                <div>{a.typeName}</div>
                            </div>
                        )}
                    >
                        {Object.values(actorTypes).map((actor) => (
                            <MenuItem value={actor.id} key={actor.id}>
                                <div
                                    style={{
                                        width: '3rem',
                                        textAlign: 'center',
                                        marginRight: '1rem',
                                    }}
                                >
                                    <ImageOrIconSwitch
                                        image={actor.image}
                                        stylesPerType={{
                                            'fa-icon': { fontSize: '3rem' },
                                            image: { height: '3rem' },
                                        }}
                                    />
                                </div>
                                <ListItemText primary={actor.typeName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={dict.actorDefinitionDialog.labelActorName}
                    value={def.name}
                    placeholder={def.type.typeName}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '1em' }}
                />
                <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={dict.actorDefinitionDialog.labelActorDescription}
                    value={def.description}
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ marginBottom: '1em' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={save} color="primary">
                    {dict.misc.btnSave}
                </Button>
                <Button onClick={cancel}>{dict.misc.btnCancel}</Button>
            </DialogActions>
        </Fragment>
    );
}
