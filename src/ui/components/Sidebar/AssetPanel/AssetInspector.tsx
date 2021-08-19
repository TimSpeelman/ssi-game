import { Button, Card, Divider, IconButton, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultLibrary } from '../../../../content';
import { AssetTreeNode } from '../../../../model/description/Asset/AssetTreeNode';
import { GameActions } from '../../../../state/actions';
import { ProjectActions } from '../../../../state/project/actions';
import {
    selectActiveActorDescs,
    selectEditing,
    selectIsInitialState,
    selectSelectedAssetNode,
} from '../../../../state/selectors';
import { formatL } from '../../../../util/util';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { ImageOrIconSwitch } from '../../elements/ImageOrIconSwitch';
import { OptionalTooltip } from '../../elements/OptionalTooltip';
import { replaceInternalResourceUrlStrings } from '../../elements/replaceInternalResourceUrlStrings';
import { SidebarTab } from '../SidebarTab';
import { AssetList } from './AssetList';

export function AssetInspector() {
    const dispatch = useDispatch();
    const { openDialog } = useDialog();
    const editing = useSelector(selectEditing);

    const isInitialState = useSelector(selectIsInitialState);

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

    function goToInitialState() {
        dispatch(ProjectActions.GOTO_STEP_INDEX({ index: -1 }));
    }

    return (
        <div>
            <Button onClick={backToOwner} id="btn-back-to-actor">
                <ChevronLeft /> {formatL(dict.assetInspector.assetsOfX, [actor!.name])}
            </Button>
            <Divider />

            {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">{dict.assetInspector.selectedAsset}</Typography>
            </div> */}

            <Card style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <div
                    style={{
                        background: '#eee',
                        padding: '1rem',
                        borderRight: '1px solid #ccc',
                        height: 'auto',
                        alignSelf: 'stretch',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {asset.asset.image && (
                        <ImageOrIconSwitch
                            image={asset.asset.image}
                            stylesPerType={{
                                image: { height: '5rem' },
                                'fa-icon': { fontSize: '5rem' },
                            }}
                        />
                    )}
                </div>
                <div style={{ flexGrow: 1, padding: '1rem' }}>
                    <Typography gutterBottom variant="h6">
                        {asset.asset.title[lang]}
                    </Typography>
                    {asset.asset.sub && (
                        <Typography gutterBottom variant="subtitle2">
                            {asset.asset.sub[lang]}
                        </Typography>
                    )}
                    {asset.asset.long && (
                        <Typography variant="body1" style={{ fontWeight: 300 }}>
                            {replaceInternalResourceUrlStrings(asset.asset.long[lang])}
                        </Typography>
                    )}
                </div>

                {editing && asset.asset.isInitial && (
                    <OptionalTooltip on={!isInitialState} title={'Ga naar de begintoestand om te wijzigen'}>
                        <div>
                            <IconButton
                                onClick={() =>
                                    openDialog('EditAsset', { actorId: asset.ownerId, assetId: asset.asset.id })
                                }
                                disabled={!isInitialState}
                            >
                                <Edit />
                            </IconButton>
                        </div>
                    </OptionalTooltip>
                )}
            </Card>

            <div style={{ marginTop: '1rem', fontSize: '80%', color: '#999' }}>
                {asset.asset.propertyDesc.map(({ title, value }, i) => (
                    <div key={i}>
                        <strong>{title[lang]}: </strong> {value[lang]}
                    </div>
                ))}
            </div>

            {asset.asset.canHaveChildren && (
                <Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <Typography variant="h6">{dict.assetInspector.assetContent}</Typography>
                        {editing && !isInitialState && (
                            <Button onClick={goToInitialState} id="btn-goto-initial-state">
                                <Edit /> Begintoestand aanpassen
                            </Button>
                        )}
                        {editing && isInitialState && (
                            <Button
                                onClick={() =>
                                    openDialog('AddAsset', { actorId: asset.ownerId, parentId: asset.asset.id })
                                }
                            >
                                <Add /> {dict.assetInspector.btnAddChildAsset}
                            </Button>
                        )}
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
