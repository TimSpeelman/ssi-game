import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioMeta } from '../../../../model/game/Scenario/ScenarioMeta';
import { ScenarioActions } from '../../../../state/scenario/actions';

export interface Props {
    meta: ScenarioMeta;
    open: boolean;
    handleClose: () => void;
}

export function ScenarioMetaDialog(props: Props) {
    const [edit, setEdit] = useState(false);
    const [meta, setMeta] = useState(props.meta);
    const dispatch = useDispatch();
    useEffect(() => setMeta(props.meta), [props.meta]);
    const setTitle = (title: string) => setMeta((m) => ({ ...m, title }));
    const setAuthor = (author: string) => setMeta((m) => ({ ...m, author }));
    const setBody = (body: string) => setMeta((m) => ({ ...m, body }));
    const save = () => {
        dispatch(ScenarioActions.CHANGE_META({ meta }));
        setEdit(false);
    };
    const cancel = () => {
        setEdit(false);
        setMeta(props.meta);
    };
    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
            <div style={{ minWidth: '50vw' }}>
                {!edit ? (
                    <Fragment>
                        <DialogTitle>{props.meta.title} </DialogTitle>
                        <DialogContent>
                            <small>Auteur: {props.meta.author}</small>
                        </DialogContent>
                        <DialogContent>
                            <DialogContentText>{props.meta.body}</DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={() => setEdit(true)}>Bewerken</Button>
                            <Button onClick={props.handleClose} color="primary">
                                Sluiten
                            </Button>
                        </DialogActions>
                    </Fragment>
                ) : (
                    <Fragment>
                        <DialogTitle>Scenario-omschrijving Aanpassen</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Pas de omschrijving aan:</DialogContentText>

                            <TextField
                                fullWidth
                                label={'Titel'}
                                value={meta.title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ marginBottom: '1em' }}
                            />
                            <TextField
                                fullWidth
                                label={'Auteur'}
                                value={meta.author}
                                onChange={(e) => setAuthor(e.target.value)}
                                style={{ marginBottom: '1em' }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                label={'Omschrijving'}
                                value={meta.body}
                                onChange={(e) => setBody(e.target.value)}
                                style={{ marginBottom: '1em' }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={save} color="primary">
                                Opslaan
                            </Button>
                            <Button onClick={cancel}>Annuleren</Button>
                        </DialogActions>
                    </Fragment>
                )}
            </div>
        </Dialog>
    );
}
