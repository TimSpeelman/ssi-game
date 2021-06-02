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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { actorImage } from '../../../../config/actorImage';
import { ActionForms } from '../../../../content/actions/forms';
import { Action } from '../../../../model/game/Action';
import { selectUsedActors } from '../../../../state/scenario/selectors';

interface Props {
    open: boolean;
    onSubmit: (act: Action) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export function StepDialog(props: Props) {
    // Depending on the chosen action type, select the appropriate form
    const [actTypeIndex, setActType] = React.useState<number>(-1);
    const actType = actTypeIndex < 0 ? undefined : ActionForms[actTypeIndex];

    const availableActors = useSelector(selectUsedActors);

    // If the action type changes, clear the data.
    const [data, setData] = useState<any>({});
    useEffect(() => setData({}), [actTypeIndex]);

    function setField(name: string, value: any) {
        setData({ ...data, [name]: value });
    }

    function handleSubmit() {
        if (!actType) return;
        props.onSubmit(actType.create(uuid(), data)); // new id?
    }

    const fields = actType ? Object.entries(actType.fields) : [];

    return (
        <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Handeling {props.isCreate ? 'Toevoegen' : 'Bewerken'}</DialogTitle>
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
                                    {availableActors.map((actor) => (
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
                <Button onClick={props.onCancel} color="primary">
                    Annuleren
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {props.isCreate ? 'Toevoegen' : 'Opslaan'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
