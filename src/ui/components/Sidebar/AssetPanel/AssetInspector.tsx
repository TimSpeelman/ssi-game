import { Button, Divider, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultLibrary } from '../../../../content';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';
import { GameActions } from '../../../../state/actions';
import { ProjectActions } from '../../../../state/project/actions';
import { selectActiveActorDescs, selectSelectedAssetNode } from '../../../../state/selectors';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { ImageOrIconSwitch } from '../../elements/ImageOrIconSwitch';
import { replaceInternalResourceUrlStrings } from '../../elements/replaceInternalResourceUrlStrings';
import { SidebarTab } from '../SidebarTab';
import { AssetList } from './AssetList';

export function AssetInspector() {
    const dispatch = useDispatch();
    const { openDialog } = useDialog();

    const asset: AssetTreeNode | undefined = useSelector(selectSelectedAssetNode);
    const actors = useSelector(selectActiveActorDescs);
    const actor = actors.find((a) => a.id === asset?.ownerId);
    const { dict, lang } = useLang();

    if (!asset) return <div></div>;

    // Depending on the chosen action type, select the appropriate form
    const type = asset?.asset.type;
    const assetType = type === undefined ? undefined : DefaultLibrary.assets.requireTypeByName(type);
    const fields = assetType ? Object.entries(assetType.schema.props) : [];
    const data = assetType ? Object.entries(assetType.schema.computeDisplayProperties(asset.asset)) : [];

    function handleAssetClick(id: string) {
        dispatch(ProjectActions.SELECT_ASSET({ id }));
    }

    function backToOwner() {
        dispatch(ProjectActions.SELECT_ACTOR({ id: actor!.id }));
        dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
    }

    return (
        <div>
            <Button onClick={backToOwner}>
                <ChevronLeft /> {dict.assetInspector.assetsOfX.replace('{0}', actor!.name)}
            </Button>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">{dict.assetInspector.selectedAsset}</Typography>
            </div>

            <div
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    padding: '1rem',
                    alignItems: 'center',
                    justifyContent: 'stretch',
                    background: '#eee',
                }}
            >
                {asset.asset.image && (
                    <ImageOrIconSwitch
                        image={asset.asset.image}
                        stylesPerType={{
                            image: { height: '5rem', marginRight: '1rem' },
                            'fa-icon': { fontSize: '5rem', marginRight: '1rem' },
                        }}
                    />
                )}

                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{asset.asset.title[lang]}</Typography>
                    {asset.asset.sub && <Typography variant="subtitle2">{asset.asset.sub[lang]}</Typography>}
                </div>

                {asset.asset.isInitial && (
                    <Button
                        onClick={() => openDialog('EditAsset', { actorId: asset.ownerId, assetId: asset.asset.id })}
                    >
                        <Edit />
                    </Button>
                )}
            </div>

            {asset.asset.long ? <p>{replaceInternalResourceUrlStrings(asset.asset.long[lang])}</p> : ''}

            {asset.asset.propertyDesc.map(({ title, value }, i) => (
                <div key={i}>
                    <strong>{title[lang]}: </strong> {value[lang]}
                </div>
            ))}

            {asset.asset.canHaveChildren && (
                <Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Typography variant="h6">
                            {dict.assetInspector.assetContent} ({asset.children.length})
                        </Typography>
                        <Button
                            onClick={() => openDialog('AddAsset', { actorId: asset.ownerId, parentId: asset.asset.id })}
                        >
                            <Add /> {dict.assetInspector.btnAddChildAsset}
                        </Button>
                    </div>
                    <AssetList
                        assets={asset.children}
                        onEdit={(id) => openDialog('EditAsset', { assetId: id, actorId: asset.ownerId })}
                        onDelete={(id) => dispatch(ProjectActions.REMOVE_ASSET({ actorId: asset.ownerId, id: id }))}
                        onClick={handleAssetClick}
                    />
                </Fragment>
            )}
        </div>
    );
}
