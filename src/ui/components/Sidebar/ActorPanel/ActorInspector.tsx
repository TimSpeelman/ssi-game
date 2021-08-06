import { Button, Divider, ListSubheader, Typography } from '@material-ui/core';
import { Add, ChevronLeft, Edit } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions, ScenarioActions } from '../../../../state/scenario/actions';
import { selectScenarioDef, selectSelectedActorDesc } from '../../../../state/scenario/selectors';
import { groupBy } from '../../../../util/util';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';
import { ImageOrIconSwitch } from '../../ImageOrIconSwitch';
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

    const grouped = groupBy(assets, (a) => a.asset.kind);
    const groups = Object.entries(grouped).map(([group, items]) => ({ group, items }));
    const kinds = {
        Feature: dict.kindFeature,
        Data: dict.kindData,
        Physical: dict.kindPhysical,
        Software: dict.kindSoftware,
        Flag: dict.kindFlag,
    };

    return (
        <div>
            <Button onClick={() => dispatch(ProjectActions.CLEAR_SELECTION())}>
                <ChevronLeft /> {dict.allActors}
            </Button>
            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">{dict.selectedActor}</Typography>
            </div>

            <div
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    alignItems: 'center',
                    justifyContent: 'stretch',
                    background: '#eee',
                }}
            >
                <ImageOrIconSwitch
                    image={definition.type.image}
                    stylesPerType={{
                        'fa-icon': { fontSize: '6rem' },
                        image: { height: '6rem' },
                    }}
                />
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{definition.name}</Typography>
                    <Typography variant="subtitle2">{definition.description}</Typography>
                </div>
                <Button onClick={() => openDialog('EditActor', { actorId: definition.id })}>
                    <Edit />
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">
                    {dict.actorProperties} ({definition.properties.length})
                </Typography>
                <Button onClick={() => openDialog('EditActorProperties', { actorId: definition.id })}>
                    <Edit /> {dict.btnEditProperties}
                </Button>
            </div>

            {definition.properties.length > 0 && (
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Eigenschap</th>
                            <th style={{ textAlign: 'left' }}>Waarde</th>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Typography variant="h6">
                    {dict.assets} ({assets.length})
                </Typography>
                <Button onClick={() => openDialog('AddAsset', { actorId: definition.id })}>
                    <Add /> {dict.btnAddAsset}
                </Button>
            </div>
            {groups.map(({ group, items }) => (
                <Fragment key={group}>
                    <ListSubheader style={{ padding: 0 }}>
                        {kinds[group as keyof typeof kinds]} ({items.length})
                    </ListSubheader>
                    <AssetList
                        assets={items}
                        onEdit={(id) => openDialog('EditAsset', { actorId: definition.id, assetId: id })}
                        onDelete={(id) => dispatch(ProjectActions.REMOVE_ASSET({ actorId: definition.id, id: id }))}
                        onClick={(id) => {
                            dispatch(ProjectActions.SELECT_ASSET({ id: id }));
                            dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS }));
                        }}
                    />
                </Fragment>
            ))}
        </div>
    );
}
