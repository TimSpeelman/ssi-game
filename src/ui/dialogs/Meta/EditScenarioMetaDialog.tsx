import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { ScenarioMeta } from '../../../model/definition/Scenario/ScenarioMeta';
import { useLang } from '../../hooks/useLang';

export interface Props {
    meta: ScenarioMeta;
    onSubmit: (meta: ScenarioMeta) => void;
    onCancel: () => void;
}

export function EditScenarioMetaDialog(props: Props) {
    const [meta, setMeta] = useState(props.meta);

    useEffect(() => setMeta(props.meta), [props.meta]);

    const setTitle = (title: string) => setMeta((m) => ({ ...m, title }));
    const setAuthor = (author: string) => setMeta((m) => ({ ...m, author }));
    const setBody = (body: string) => setMeta((m) => ({ ...m, body }));

    const save = () => {
        props.onSubmit(meta);
    };

    const cancel = () => {
        setMeta(props.meta);
    };

    const { dict } = useLang();

    return (
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
    );
}
