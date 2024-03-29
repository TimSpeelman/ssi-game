import React from 'react';
import { Field } from '../../../model/content/Common/Props/Field';
import { ActorFormControl } from './ActorFormControl';
import { AssetFormControl } from './AssetFormControl';
import { ImageSelectFormControl } from './ImageSelectFormControl';
import { StringFormControl } from './StringFormControl';

const formControls = {
    string: StringFormControl,
    asset: AssetFormControl,
    actor: ActorFormControl,
    'image-select': ImageSelectFormControl,
};

export interface Props {
    props: Field;
    setField: (value: any) => void;
}

export function FormControlSwitch(props: Props) {
    const FormControl = formControls[props.props.type];
    // @ts-ignore
    return <FormControl {...props} />;
}
