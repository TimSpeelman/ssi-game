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
import { FormControlSwitch } from './Field/FormControlSwitch';

interface Props {
    action?: ActionDef<any>;
    onSubmit: (act: ActionDef<any>) => void;
    onCancel: () => void;
    isCreate: boolean;
}

export const actionFrmHandler = new ActionFormHandler(DefaultActionsCollection);

export function StepDialog2(props: Props) {
    const [type, setType] = useState<string | undefined>(undefined);
    const [actProps, setActProps] = useState<any>({});
    const def = useSelector(selectScenarioDef);
    const step = useSelector(selectActiveStepIndex);

    // Clear data when changing type
    useEffect(() => setActProps({}), [type]);

    // When an action is provided, load its data into local state
    useEffect(() => {
        let timer: any;
        if (props.action) {
            setType(props.action.typeName);
            timer = setTimeout(() => {
                setActProps(props.action!.props);
            }, 200);
        }
        return () => clearTimeout(timer);
    }, [props.action]);

    function setField(name: string, value: any) {
        setActProps({ ...actProps, [name]: value });
    }

    function handleSubmit() {
        if (!type) return;
        const serializedAction: ActionDef<any> = {
            id: props.action?.id || uuid(),
            props: actProps,
            typeName: type!,
        };
        props.onSubmit(serializedAction);
    }

    // const fields = actType ? Object.entries(actType.fields) : [];
    const { dict, lang } = useLang();

    const actionTypes = actionFrmHandler.listAvailableActionTypes();
    const formProps = actionFrmHandler.computeFormProperties(def, step, type, actProps);
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
