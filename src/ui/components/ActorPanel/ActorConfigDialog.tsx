import {
    Button,
    Dialog,
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
import React, { useEffect, useState } from 'react';
import { actorImage } from '../../../config/actorImage';
import { actorTypes } from '../../../config/actorTypes';
import { ActorType } from '../../../model/game/ActorType';
import { ActorConfig } from '../../../model/game/Scenario';

export interface Props {
    actorConfig?: ActorConfig;
    open: boolean;
    handleClose: () => void;
    handleSubmit: (actor: ActorConfig) => void;
    isCreate: boolean;
}

// export interface Actor {
//     id: string;
//     image: ImgName;
//     modeImages?: Record<string, ImgName>;
//     name: string;
//     nounPhrase: string;
//     isMale: boolean;
//     isHuman: boolean;
// }

const defaultActorConfig: ActorConfig = {
    definition: {
        id: '',
        type: actorTypes.person1,
        name: '',
        nounPhrase: '',
    },
    initialAssets: [],
};

const L = lens<ActorConfig>();

export function ActorConfigDialog(props: Props) {
    const [config, setConfig] = useState(defaultActorConfig);
    useEffect(() => (props.actorConfig ? setConfig(props.actorConfig) : setConfig(defaultActorConfig)), [
        props.actorConfig,
    ]);

    const setType = (actorType: ActorType) => setConfig(L.definition.type.set(actorType));
    const setName = (name: string) => setConfig(L.definition.set((m) => ({ ...m, name, nounPhrase: name })));
    const setDesc = (description: string) => setConfig(L.definition.description!.set(description));

    const save = () => {
        // dispatch(ScenarioActions.CHANGE_META({ meta }));
        const L = lens<ActorConfig>();
        const typeName = L.definition.type.typeName.get()(config);
        const withName = L.definition.name.set((n) => (n ? n : typeName))(config);
        const name = L.definition.name.get()(withName);
        const withNounPhrase = L.definition.nounPhrase.set((n) => (n ? n : name))(withName);
        props.handleSubmit(withNounPhrase);
    };

    const cancel = () => {
        // setDefinition(props.meta);
        props.handleClose();
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
            <div style={{ minWidth: '50vw' }}>
                <DialogTitle>Actor {props.isCreate ? 'toevoegen' : 'wijzigen'}</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>

                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            fullWidth
                            value={config.definition.type}
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
                                        <img src={actorImage(a.image)} style={{ height: '3rem' }} />
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
                                        <img src={actorImage(actor.image)} style={{ height: '3rem' }} />
                                    </div>
                                    <ListItemText
                                        primary={actor.typeName}
                                        // secondary={actorSubtitle(actor)}
                                    />
                                </MenuItem>
                            ))}
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={'Naam'}
                        value={config.definition.name}
                        placeholder={config.definition.type.typeName}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={'Omschrijving'}
                        value={config.definition.description}
                        onChange={(e) => setDesc(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={save} color="primary">
                        Opslaan
                    </Button>
                    <Button onClick={cancel}>Annuleren</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}
