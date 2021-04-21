import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { actorImage } from '../../config/actorImage';
import { ActionForms } from '../../data/action/forms';
import { IAction } from '../../data/action/IAction';
import { Actor } from '../../data/actor/Actor';

interface Props {
    onAdd: (act: IAction) => void;
    availableActors: Actor[];
}

export function AddStepMenu(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [actTypeIndex, setActType] = React.useState<number>(-1);
    const actType = actTypeIndex < 0 ? undefined : ActionForms[actTypeIndex];
    const [data, setData] = useState<any>({});
    useEffect(() => setData({}), [actTypeIndex]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!actType) return;
        props.onAdd(actType.create(uuid(), data));
        handleClose();
    };

    function setField(name: string, value: any) {
        setData({ ...data, [name]: value });
    }

    const fields = actType ? Object.entries(actType.fields) : [];

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                <Add /> Handeling
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Handeling Toevoegen</DialogTitle>
                <DialogContent>
                    <DialogContentText>Kies een handeling</DialogContentText>
                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel>Handeling</InputLabel>
                        <Select value={actTypeIndex} onChange={(e) => setActType(e.target.value as number)}>
                            {ActionForms.map((actType, i) => (
                                <MenuItem key={i} value={i}>
                                    {actType.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {fields.map(([prop, field]) => (
                        <div key={prop}>
                            {field.type === 'actor' && (
                                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                                    <InputLabel>{field.title}</InputLabel>
                                    <Select value={data[prop] || ''} onChange={(e) => setField(prop, e.target.value)}>
                                        {props.availableActors.map((actor) => (
                                            <MenuItem key={actor.id} value={actor.id}>
                                                <img src={actorImage(actor.image)} style={{ height: '2rem' }} />
                                                {actor.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            {field.type === 'string' && (
                                <TextField
                                    style={{ marginBottom: '1em' }}
                                    margin="dense"
                                    id={'input-' + prop}
                                    label={field.title}
                                    value={data[prop] || ''}
                                    onChange={(e) => setField(prop, e.target.value)}
                                    fullWidth
                                />
                            )}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuleren
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Toevoegen
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
