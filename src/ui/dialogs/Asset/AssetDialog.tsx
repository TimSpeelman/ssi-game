import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { DefaultLibrary } from '../../../content';
import { AssetFormHandler } from '../../../model/content/Asset/AssetFormHandler';
import { AssetDef } from '../../../model/definition/Asset/AssetDef';
import { selectActiveStepIndex, selectScenarioDef } from '../../../state/selectors';
import { useLang } from '../../hooks/useLang';
import { FormControlSwitch } from '../Field/FormControlSwitch';

interface Props {
    asset?: AssetDef<any>;
    parentId?: string;
    onSubmit: (act: AssetDef<any>) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export const formHandler = new AssetFormHandler(DefaultLibrary.assets);

export function AssetDialog(props: Props) {
    const [type, setType] = useState<string>(props.asset?.typeName || '');
    const [formData, setData] = useState<any>(props.asset?.props || {});
    const def = useSelector(selectScenarioDef);
    const step = useSelector(selectActiveStepIndex);
    const isEditing = !!props.asset;

    // Clear data when changing type
    useEffect(() => {
        if (!isEditing) {
            setData({});
        }
    }, [type]);

    // When an action is provided, load its data into local state
    useEffect(() => {
        if (isEditing) {
            setType(props.asset!.typeName);
            setData(props.asset!.props);
        }
    }, [props.asset]);

    function setField(name: string, value: any) {
        setData({ ...formData, [name]: value });
    }

    function handleSubmit() {
        if (!type) return;
        const id = props.asset?.id || uuid();
        const parentId = props.asset ? props.asset.parentId : props.parentId;
        const definition = formHandler.parseFormData(def, stateIndex, type, formData, id, parentId);
        props.onSubmit(definition);
    }

    const { dict, lang } = useLang();

    const stateIndex = isEditing ? step : def.steps.length;
    const types = formHandler.listAvailableAssetTypes();
    const formProps = formHandler.computeFormProperties(def, stateIndex, type, formData);
    const fields = Object.entries(formProps ? formProps.fields : {});

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">
                {props.isCreate ? dict.titleCreateAsset : dict.titleEditAsset}
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel shrink={true}>{dict.labelAssetType}</InputLabel>
                    <Select disabled={!props.isCreate} value={type} onChange={(e) => setType(e.target.value as string)}>
                        {types.map((actType) => (
                            <MenuItem key={actType.typeName} value={actType.typeName}>
                                {actType.title[lang]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {formProps?.description && <p>{formProps.description[lang]}</p>}

                {fields.map(([prop, fieldProps]) => (
                    <FormControlSwitch key={prop} props={fieldProps} setField={(v) => setField(prop, v)} />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel} color="primary">
                    {dict.btnCancel}
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {props.isCreate ? dict.btnAdd : dict.btnSave}
                </Button>
            </DialogActions>
        </Fragment>
    );
}
