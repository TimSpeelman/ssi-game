import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAssetNode } from '../../../../state/scenario/selectors';
import { AssetInspector } from './AssetInspector';

export function AssetPanel() {
    const selectedAsset = useSelector(selectSelectedAssetNode);

    return (
        <div style={{ padding: '1rem' }}>
            {!selectedAsset && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Geen asset geselecteerd</Typography>
                    </div>
                    <Typography variant="body1">Selecteer een asset om hier de details te bekijken.</Typography>
                </div>
            )}
            {selectedAsset && <AssetInspector />}
        </div>
    );
}
