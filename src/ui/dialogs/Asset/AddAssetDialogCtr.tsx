import React from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioActions } from '../../../state/scenario/actions';
import { AssetDialog } from './AssetDialog';

interface Props {
    options: AddAssetDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export interface AddAssetDialogOptions {
    actorId: string;
    parentId?: string;
}

export function AddAssetDialogCtr(props: Props) {
    const dispatch = useDispatch();

    return (
        <AssetDialog
            onSubmit={(asset) => {
                dispatch(
                    ScenarioActions.ADD_ASSET({
                        actorId: props.options.actorId,
                        asset: asset,
                    }),
                );
                props.onSubmit();
            }}
            parentId={props.options.parentId}
            onCancel={props.onCancel}
            isCreate={true}
        />
    );
}
