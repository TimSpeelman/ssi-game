import {
    Button,
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
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { actorImage } from '../../../config/actorImage';
import { AssetForms } from '../../../content/assets/forms';
import { ActionDef } from '../../../model/definition/Action/ActionDef';
import { AssetDef } from '../../../model/definition/Asset/AssetDef';
import { selectUsedActors } from '../../../state/scenario/selectors';
import { mapValues } from '../../../util/util';

interface Props {
    asset?: AssetDef<any>;
    onSubmit: (act: AssetDef<any>) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export function AssetDialog(props: Props) {
    const [type, setType] = useState<string>('');
    const [assetProps, setAssetProps] = useState<any>({});

    // Depending on the chosen action type, select the appropriate form
    const assetType = type === '' ? '' : AssetForms.find((f) => f.typeName === type)!;

    // Clear data when changing type
    useEffect(() => setAssetProps(!assetType ? {} : mapValues(assetType.fields, (fld) => '')), [type]);

    // When an action is provided, load its data into local state
    useEffect(() => {
        if (props.asset) {
            setType(props.asset.typeName);
            setTimeout(() => {
                setAssetProps(props.asset!.props);
            }, 200);
        }
    }, [props.asset]);

    const availableActors = useSelector(selectUsedActors);

    function setField(name: string, value: any) {
        setAssetProps({ ...assetProps, [name]: value });
    }

    function handleSubmit() {
        if (!type) return;
        const serializedAction: ActionDef<any> = {
            id: props.asset?.id || uuid(),
            props: assetProps,
            typeName: type!,
        };
        props.onSubmit(serializedAction);
    }

    const fields = assetType ? Object.entries(assetType.fields) : [];

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">Asset {props.isCreate ? 'Toevoegen' : 'Bewerken'}</DialogTitle>
            <DialogContent>
                <DialogContentText>Kies een Asset</DialogContentText>
                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel shrink={true}>Asset</InputLabel>
                    <Select disabled={!props.isCreate} value={type} onChange={(e) => setType(e.target.value as string)}>
                        {AssetForms.map((actType) => (
                            <MenuItem key={actType.typeName} value={actType.typeName}>
                                {actType.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {fields.map(([prop, field]) =>
                    !field ? (
                        ''
                    ) : (
                        <div key={prop}>
                            {field.type === 'actor' && (
                                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                                    <InputLabel>{field.title}</InputLabel>
                                    <Select
                                        value={assetProps[prop] || ''}
                                        onChange={(e) => setField(prop, e.target.value)}
                                    >
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
                                    value={assetProps[prop] || ''}
                                    onChange={(e) => setField(prop, e.target.value)}
                                    fullWidth
                                />
                            )}
                        </div>
                    ),
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel} color="primary">
                    Annuleren
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {props.isCreate ? 'Toevoegen' : 'Opslaan'}
                </Button>
            </DialogActions>
        </Fragment>
    );
}
