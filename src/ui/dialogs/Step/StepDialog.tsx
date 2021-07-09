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
import { DefaultActionsCollection } from '../../../content/actions/actions';
import { ActionFormHandler } from '../../../model/content/Action/ActionFormHandler';
import { ActionDef } from '../../../model/definition/Action/ActionDef';
import { selectActiveStepIndex, selectScenarioDef } from '../../../state/scenario/selectors';
import { useLang } from '../../hooks/useLang';
import { FormControlSwitch } from '../Field/FormControlSwitch';

interface Props {
    action?: ActionDef<any>;
    onSubmit: (act: ActionDef<any>) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export const formHandler = new ActionFormHandler(DefaultActionsCollection);

export function StepDialog(props: Props) {
    const [type, setType] = useState<string | undefined>(props.action?.typeName || '');
    const [formData, setData] = useState<any>(props.action?.props || {});
    const def = useSelector(selectScenarioDef);
    const step = useSelector(selectActiveStepIndex);
    const isEditing = !!props.action;

    // Clear data when changing type
    useEffect(() => {
        if (!isEditing) {
            setData({});
        }
    }, [type]);

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
        const definition: ActionDef<any> = {
            id: props.action?.id || uuid(),
            props: formData,
            typeName: type!,
        };
        props.onSubmit(definition);
    }

    const { dict, lang } = useLang();

    const actionTypes = formHandler.listAvailableActionTypes();
    const formProps = formHandler.computeFormProperties(def, step, type, formData);
    const fields = Object.entries(formProps ? formProps.fields : {});

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">
                {props.isCreate ? dict.titleCreateStep : dict.titleEditStep}
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth style={{ marginBottom: '1em' }}>
                    <InputLabel>{dict.labelStepType}</InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value as string)}>
                        {actionTypes.map((actType) => (
                            <MenuItem key={actType.typeName} value={actType.typeName}>
                                {actType.title[lang]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
