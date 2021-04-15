import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { actorImage } from '../../config/actorImage';
import { allActors } from '../../config/actors';
import { Interaction } from '../../data/action/Interaction';
import { Actor } from '../../data/actor/Actor';
import { actTypes } from '../../data/actTypes';

interface Props {
    onAdd: (act: Interaction) => void;
}

export function AddActivityMenu(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [actType, setActType] = React.useState<string>('');
    const [desc, setDesc] = React.useState<string>('');
    const [actorOne, setActorOne] = React.useState<Actor>(allActors.person1);
    const [actorTwo, setActorTwo] = React.useState<Actor>(allActors.gov1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.onAdd({
            id: uuid(),
            description: actTypes.find((t) => t.type === actType)!.desc,
            from: actorOne,
            to: actorTwo,
            sub: desc,
        });
        handleClose();
    };

    return (
        <Fragment>
            <Button onClick={handleClickOpen}>Voeg handeling toe</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Handeling Toevoegen</DialogTitle>
                <DialogContent>
                    <DialogContentText>Kies een handeling</DialogContentText>
                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel>Handeling</InputLabel>
                        <Select value={actType} onChange={(e) => setActType(e.target.value as string)}>
                            {actTypes.map((actType) => (
                                <MenuItem key={actType.type} value={actType.type}>
                                    {actType.desc}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel>Actor 1</InputLabel>
                        <Select value={actorOne.id} onChange={(e) => setActorOne(allActors[e.target.value as string])}>
                            {Object.values(allActors).map((actor) => (
                                <MenuItem key={actor.id} value={actor.id}>
                                    <img src={actorImage(actor.image)} style={{ height: '2rem' }} />
                                    {actor.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel>Actor 2</InputLabel>
                        <Select value={actorTwo.id} onChange={(e) => setActorTwo(allActors[e.target.value as string])}>
                            {Object.values(allActors).map((actor) => (
                                <MenuItem key={actor.id} value={actor.id}>
                                    <img src={actorImage(actor.image)} style={{ height: '2rem' }} />
                                    {actor.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        style={{ marginBottom: '1em' }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Omschrijving"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        fullWidth
                    />
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
