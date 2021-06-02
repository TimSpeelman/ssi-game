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
import { ActionDef } from '../../../../model/definition/Action/ActionDef';
import { selectUsedActors } from '../../../../state/scenario/selectors';

interface Props {
    open: boolean;
    action?: ActionDef<any>;
    onSubmit: (act: ActionDef<any>) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export function StepDialog(props: Props) {
    const [type, setType] = useState<string | undefined>(undefined);
    const [actProps, setActProps] = useState<any>({});

    // Clear data when changing type
    useEffect(() => setActProps({}), [type]);

    // When an action is provided, load its data into local state
    useEffect(() => {
        if (props.action) {
            setType(props.action.typeName);
            setTimeout(() => {
                setActProps(props.action!.props);
            }, 200);
        }
    }, [props.action]);

    // Depending on the chosen action type, select the appropriate form
    const actType = type === undefined ? undefined : ActionForms.find((f) => f.typeName === type)!;

    const availableActors = useSelector(selectUsedActors);

    function setField(name: string, value: any) {
        setActProps({ ...actProps, [name]: value });
    }

    function handleSubmit() {
        if (!type) return;
        const serializedAction: ActionDef<any> = {
            id: props.action?.id || uuid(),
            props: actProps,
            typeName: type!,
        };
        props.onSubmit(serializedAction);
    }

    const fields = actType ? Object.entries(actType.fields) : [];

    return (
        <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Handeling {props.isCreate ? 'Toevoegen' : 'Bewerken'}</DialogTitle>
            <DialogContent>
                <DialogContentText>Kies een handeling</DialogContentText>
                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel>Handeling</InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value as string)}>
                        {ActionForms.map((actType) => (
                            <MenuItem key={actType.typeName} value={actType.typeName}>
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
                                <Select value={actProps[prop] || ''} onChange={(e) => setField(prop, e.target.value)}>
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
                                value={actProps[prop] || ''}
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
