import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAssetNode } from '../../../../state/selectors';
import { useLang } from '../../../hooks/useLang';
import { AssetInspector } from './AssetInspector';

export function AssetPanel() {
    const selectedAsset = useSelector(selectSelectedAssetNode);
    const { dict } = useLang();
    return (
        <div style={{ padding: '1rem' }}>
            {!selectedAsset && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">{dict.assetPanel.msgNoAssetSelected.title}</Typography>
                    </div>
                    <Typography variant="body1">{dict.assetPanel.msgNoAssetSelected.description}</Typography>
                </div>
            )}
            {selectedAsset && <AssetInspector />}
        </div>
    );
}
