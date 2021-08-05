import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../../state/scenario/actions';
import { selectAssetDefById } from '../../../state/scenario/selectors';
import { AssetDialog } from './AssetDialog';

interface Props {
    options: EditAssetDialogOptions;
    onSubmit: () => void;
    onCancel: () => void;
}

export interface EditAssetDialogOptions {
    actorId: string;
    assetId: string;
}

export function EditAssetDialogCtr(props: Props) {
    const dispatch = useDispatch();
    const selector = selectAssetDefById(props.options.assetId);
    const asset = useSelector(selector);

    return (
        <AssetDialog
            asset={asset}
            onSubmit={(asset) => {
                dispatch(ProjectActions.UPDATE_ASSET({ actorId: props.options.actorId, asset }));
                props.onSubmit();
            }}
            onCancel={props.onCancel}
            isCreate={false}
        />
    );
}
