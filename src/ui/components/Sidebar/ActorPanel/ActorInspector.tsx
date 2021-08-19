import { Button, Card, Divider, IconButton, ListSubheader, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../../../state/actions';
import { ProjectActions } from '../../../../state/project/actions';
import {
    selectEditing,
    selectIsInitialState,
    selectScenarioDef,
    selectSelectedActorDesc,
} from '../../../../state/selectors';
import { groupBy } from '../../../../util/util';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { ImageOrIconSwitch } from '../../elements/ImageOrIconSwitch';
import { AssetList } from '../AssetPanel/AssetList';
import { SidebarTab } from '../SidebarTab';

/** Shows the details of a scenario step */
export function ActorInspector() {
    const dispatch = useDispatch();
    const actorState = useSelector(selectSelectedActorDesc)!;
    const { assetTrees: assets } = actorState;
    const scenarioDef = useSelector(selectScenarioDef);
    const { actors } = scenarioDef;
    const actorConfig = actors.find((a) => a.definition.id === actorState?.actor.id);
    const { definition, initialAssets } = actorConfig!;
    const { openDialog } = useDialog();
    const { dict } = useLang();

    const isInitialState = useSelector(selectIsInitialState);

    const grouped = groupBy(assets, (a) => a.asset.kind);
    const groups = Object.entries(grouped).map(([group, items]) => ({ group, items }));
    const kinds = {
        Feature: dict.assetKind.feature,
        Data: dict.assetKind.data,
        Physical: dict.assetKind.physical,
        Software: dict.assetKind.software,
        Flag: dict.assetKind.flag,
    };
    const editing = useSelector(selectEditing);

    return (
        <div>
            <Button onClick={() => dispatch(ProjectActions.CLEAR_SELECTION())} id="btn-all-actors">
                <ChevronLeft /> {dict.actorInspector.allActors}
            </Button>
            <Divider />

            {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">{dict.actorInspector.selectedActor}</Typography>
            </div> */}

            <Card style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <div style={{ background: '#eee', padding: '1rem', borderRight: '1px solid #ccc' }}>
                    <ImageOrIconSwitch
                        image={definition.type.image}
                        stylesPerType={{
                            'fa-icon': { fontSize: '6rem' },
                            image: { height: '6rem' },
                        }}
                    />
                </div>
                <div style={{ flexGrow: 1, padding: '1rem' }}>
                    <Typography variant="h6">{definition.name}</Typography>
                    <Typography variant="subtitle2">{definition.description}</Typography>
                </div>
                {editing && (
                    <IconButton
                        onClick={() => openDialog('EditActor', { actorId: definition.id })}
                        style={{ marginRight: '1rem' }}
                    >
                        <Edit />
                    </IconButton>
                )}
            </Card>

            <div id="actor-properties">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Typography variant="h6">{dict.actorInspector.actorProperties}</Typography>
                    {editing && (
                        <Button onClick={() => openDialog('EditActorProperties', { actorId: definition.id })}>
                            <Edit /> {dict.actorInspector.btnEditProperties}
                        </Button>
                    )}
                </div>

                {definition.properties.length > 0 && (
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>{dict.actorInspector.thPropertyName}</th>
                                <th style={{ textAlign: 'left' }}>{dict.actorInspector.thPropertyValue}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {definition.properties.map(([key, val], index) => (
                                <tr key={index}>
                                    <td>{key}</td>
                                    <td>{val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div id="actor-assets">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Typography variant="h6">{dict.actorInspector.assets}</Typography>
                    {!editing ? (
                        ''
                    ) : isInitialState ? (
                        <Button onClick={() => openDialog('AddAsset', { actorId: definition.id })}>
                            <Add /> {dict.actorInspector.btnAddAsset}
                        </Button>
                    ) : (
                        <Button
                            onClick={() => dispatch(ProjectActions.GOTO_STEP_INDEX({ index: -1 }))}
                            id="btn-goto-initial-state"
                        >
                            <Edit /> Begintoestand aanpassen
                        </Button>
                    )}
                </div>
                {groups.map(({ group, items }) => (
                    <Fragment key={group}>
                        <ListSubheader style={{ padding: 0 }}>{kinds[group as keyof typeof kinds]}</ListSubheader>
                        <AssetList
                            assets={items}
                            onEdit={(id) => openDialog('EditAsset', { actorId: definition.id, assetId: id })}
                            onDelete={(id) => dispatch(ProjectActions.REMOVE_ASSET({ actorId: definition.id, id: id }))}
                            onClick={(id) => {
                                dispatch(ProjectActions.SELECT_ASSET({ id: id }));
                                dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS }));
                            }}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
