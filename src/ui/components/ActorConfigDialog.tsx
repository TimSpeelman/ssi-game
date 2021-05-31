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
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actorImage } from '../../config/actorImage';
import { allActors } from '../../config/actors';
import { Actor } from '../../model/game/Actor';
import { ActorState } from '../../model/view/ActorState';

export interface Props {
    actorState: ActorState;
    open: boolean;
    handleClose: () => void;
    handleSubmit: (actor: ActorState) => void;
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

const defaultActor: Actor = {
    id: '',
    image: 'person1',
    name: '',
    nounPhrase: '',
    isMale: true,
    isHuman: true,
};

export function ActorConfigDialog(props: Props) {
    const [actor, setActor] = useState(defaultActor);
    useEffect(() => (props.actorState ? setActor(props.actorState.actor) : setActor(defaultActor)), [props.actorState]);

    const dispatch = useDispatch();

    const pickPreset = (actor: Actor) => setActor(actor);
    const setName = (name: string) => setActor((m) => ({ ...m, name, nounPhrase: name }));
    const setDesc = (description: string) => setActor((m) => ({ ...m, description }));

    const save = () => {
        // dispatch(ScenarioActions.CHANGE_META({ meta }));
        props.handleSubmit({ ...props.actorState, actor });
    };

    const cancel = () => {
        // setActor(props.meta);
        props.handleClose();
    };

    const actors = Object.values(allActors);

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
            <div style={{ minWidth: '50vw' }}>
                <DialogTitle>Actor wijzigen</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>

                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            fullWidth
                            value={actor}
                            onChange={(e) => pickPreset(actors.find((actor) => actor.id === e.target.value)!)}
                            renderValue={(a: Actor) => (
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
                                    <div>{a.name}</div>
                                </div>
                            )}
                        >
                            {actors.map((actor) => (
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
                                        primary={actor.name}
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
                        label={'Naam'}
                        value={actor.name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                    <TextField
                        fullWidth
                        label={'Omschrijving'}
                        value={actor.description}
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
