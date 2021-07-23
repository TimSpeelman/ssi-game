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
import { ScenarioMeta } from '../../../../model/definition/ScenarioMeta';
import { ProjectActions } from '../../../../state/scenario/actions';
import { useLang } from '../../../hooks/useLang';

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
        dispatch(ProjectActions.CHANGE_META({ meta }));
        setEdit(false);
    };
    const cancel = () => {
        setEdit(false);
        setMeta(props.meta);
    };
    const { dict } = useLang();
    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
            <div style={{ minWidth: '50vw' }}>
                {!edit ? (
                    <Fragment>
                        <DialogTitle>{props.meta.title} </DialogTitle>
                        <DialogContent>
                            <small>
                                {dict.author}: {props.meta.author}
                            </small>
                        </DialogContent>
                        <DialogContent>
                            <DialogContentText>{props.meta.body}</DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={() => setEdit(true)}>{dict.btnEditScenarioMeta}</Button>
                            <Button onClick={props.handleClose} color="primary">
                                {dict.btnClose}
                            </Button>
                        </DialogActions>
                    </Fragment>
                ) : (
                    <Fragment>
                        <DialogTitle>{dict.metaDialog_title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{dict.metaDialog_explanation}</DialogContentText>

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
                                {dict.btnSave}
                            </Button>
                            <Button onClick={cancel}>{dict.btnCancel}</Button>
                        </DialogActions>
                    </Fragment>
                )}
            </div>
        </Dialog>
    );
}
