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
import { ActionDef } from '../../../model/definition/Action/ActionDef';
import { ActionFormHandler } from '../../../model/view/ActionFormHandler';
import { selectActiveStepIndex, selectScenarioDef } from '../../../state/selectors';
import { useLang } from '../../hooks/useLang';
import { FormControlSwitch } from '../Field/FormControlSwitch';

interface Props {
    action?: ActionDef<any>;
    onSubmit: (act: ActionDef<any>) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export const formHandler = new ActionFormHandler(DefaultLibrary.actions);

export function StepDialog(props: Props) {
    const [type, setType] = useState<string | undefined>(props.action?.typeName || '');
    const [formData, setData] = useState<any>(props.action?.props || {});
    const def = useSelector(selectScenarioDef);
    const step = useSelector(selectActiveStepIndex);
    const isEditing = !!props.action;

    // Clear data when changing type
    useEffect(() => {
        if (!isEditing) {
            setData(formHandler.getFormDefaults(type));
        }
    }, [type]);

    /** If we are creating a new state we take the current step's poststate */
    const stateIndex = isEditing ? step : step + 1;
    const actionTypes = formHandler.listAvailableActionTypes();
    const formProps = formHandler.computeFormProperties(def, stateIndex, type, formData);

    const [showErrors, setShowErrors] = useState(false);
    const hasErrors = Object.values(formProps?.fields || {}).some((f) => !!f.error);

    let fields = Object.entries(formProps ? formProps.fields : {});
    if (!showErrors) {
        fields = fields.map(([key, field]) => [key, { ...field, error: undefined }]);
    }

    // When an action is provided, load its data into local state
    useEffect(() => {
        if (isEditing) {
            setType(props.action!.typeName);
            setData(props.action!.props);
        }
    }, [props.action]);

    function setField(name: string, value: any) {
        setData({ ...formData, [name]: value });
    }

    function handleSubmit() {
        if (!type) return;
        if (hasErrors) {
            setShowErrors(true);
            return;
        }
        const definition: ActionDef<any> = {
            id: props.action?.id || uuid(),
            props: formProps!.data,
            typeName: type!,
        };
        props.onSubmit(definition);
    }

    const { dict, lang } = useLang();

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">
                {props.isCreate ? dict.actionDialog.titleCreateStep : dict.actionDialog.titleEditStep}
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel>{dict.actionDialog.labelStepType}</InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value as string)} disabled={isEditing}>
                        {actionTypes.map((actType) => (
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
