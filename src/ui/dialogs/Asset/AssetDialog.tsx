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
import { AssetDef } from '../../../model/definition/Asset/AssetDef';
import { AssetFormHandler } from '../../../model/view/AssetFormHandler';
import { selectActiveStepIndex, selectScenarioDef } from '../../../state/selectors';
import { useLang } from '../../hooks/useLang';
import { FormControlSwitch } from '../Field/FormControlSwitch';

interface Props {
    asset?: AssetDef;
    parentId?: string;
    onSubmit: (act: AssetDef) => void;
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

    const stateIndex = -1; // Use the initial state, because assets are defined only on the initial state
    const types = formHandler.listAvailableAssetTypes();
    const formProps = formHandler.computeFormProperties(def, stateIndex, type, formData);

    const [showErrors, setShowErrors] = useState(false);
    const hasErrors = Object.values(formProps?.fields || {}).some((f) => !!f.error);

    // Clear data when changing type
    useEffect(() => {
        if (!isEditing) {
            setData(formHandler.getFormDefaults(type));
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
        if (hasErrors) {
            setShowErrors(true);
            return;
        }
        const id = props.asset?.id || uuid();
        const parentId = props.asset ? props.asset.parentId : props.parentId;
        const definition = formHandler.parseFormData(def, stateIndex, type, formData, id, parentId);
        props.onSubmit(definition);
    }

    const { dict, lang } = useLang();

    let fields = Object.entries(formProps ? formProps.fields : {});
    if (!showErrors) {
        fields = fields.map(([key, field]) => [key, { ...field, error: undefined }]);
    }

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">
                {props.isCreate ? dict.assetDialog.titleCreateAsset : dict.assetDialog.titleEditAsset}
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel shrink={true}>{dict.assetDialog.labelAssetType}</InputLabel>
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
                    {dict.misc.btnCancel}
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {props.isCreate ? dict.misc.btnAdd : dict.misc.btnSave}
                </Button>
            </DialogActions>
        </Fragment>
    );
}
