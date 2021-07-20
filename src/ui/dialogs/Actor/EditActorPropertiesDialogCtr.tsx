import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScenarioActions } from '../../../state/scenario/actions';
import { selectActorDefById } from '../../../state/scenario/selectors';
import { useLang } from '../../hooks/useLang';

interface Props {
    options: EditActorPropertiesDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export interface EditActorPropertiesDialogOptions {
    actorId: string;
}

export function EditActorPropertiesDialogCtr(props: Props) {
    const dispatch = useDispatch();
    const selector = selectActorDefById(props.options.actorId);
    const actor = useSelector(selector);
    const { definition, initialAssets } = actor!;
    const { dict } = useLang();
    const [data, setData] = useState<Array<[string, string]>>(definition.properties);

    function save() {
        const _data = data
            .map(([key, val]) => [key.trim(), val.trim()] as [string, string])
            .filter(([key, val]) => key !== '' || val !== '');
        dispatch(ScenarioActions.UPDATE_ACTOR_DEFINITION({ def: { ...definition, properties: _data } }));
        props.onSubmit();
    }

    function cancel() {
        props.onCancel();
    }

    function setKey(index: number, newKey: string) {
        setData((d) => d.map(([key, val], i) => (i === index ? [newKey, val] : [key, val])));
    }
    function setVal(index: number, newVal: string) {
        setData((d) => d.map(([key, val], i) => (i === index ? [key, newVal] : [key, val])));
    }
    function dropRow(index: number) {
        setData((d) => d.filter(([key, val], i) => i !== index));
    }
    function addRow() {
        setData((d) => [...d, ['', '']]);
    }

    return (
        <Fragment>
            <DialogTitle>Edit Actor Properties</DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Eigenschap</th>
                            <th style={{ textAlign: 'left' }}>Waarde</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(([key, val], index) => (
                            <tr key={index}>
                                <td>
                                    <TextField value={key} onChange={(e) => setKey(index, e.target.value)} />
                                </td>
                                <td>
                                    <TextField value={val} onChange={(e) => setVal(index, e.target.value)} />
                                </td>
                                <td style={{ width: 1 }}>
                                    <Button onClick={() => dropRow(index)}>
                                        <Delete />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}>
                                <Button onClick={addRow}>
                                    <Add /> Toevoegen
                                </Button>{' '}
                            </td>
                        </tr>
                    </tbody>
                </table>
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