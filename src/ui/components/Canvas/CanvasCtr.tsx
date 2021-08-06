import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions, ScenarioActions } from '../../../state/scenario/actions';
import {
    selectActiveStateDesc,
    selectActiveStepDesc,
    selectHighlightedResource,
    selectLang,
    selectSelectedActorId,
    selectSelectedAssetId,
    selectUsedActors,
} from '../../../state/scenario/selectors';
import { createNetworkCanvasData } from '../networkToCanvas';
import { SidebarTab } from '../Sidebar/SidebarTab';
import { CanvasEvent } from './data/CanvasEvent';
import { SVGNetworkCanvas } from './SVGNetworkCanvas';

export function CanvasCtr() {
    const dispatch = useDispatch();
    const selectedActorId = useSelector(selectSelectedActorId);
    const selectedAssetId = useSelector(selectSelectedAssetId);
    const usedActors = useSelector(selectUsedActors);
    const currentStep = useSelector(selectActiveStepDesc);
    const currentState = useSelector(selectActiveStateDesc);
    const lang = useSelector(selectLang);
    const hoveredResource = useSelector(selectHighlightedResource);

    function handleClickActor(id: string) {
        if (selectedActorId === id) {
            dispatch(ProjectActions.CLEAR_SELECTION());
        } else {
            dispatch(ProjectActions.SELECT_ACTOR({ id }));
            dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
        }
    }

    function handleClickAsset(id: string) {
        if (selectedAssetId === id) {
            dispatch(ProjectActions.CLEAR_SELECTION());
        } else {
            dispatch(ProjectActions.SELECT_ASSET({ id }));
            dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS }));
        }
    }

    const handleEvent = (ev: CanvasEvent) => {
        switch (ev.type) {
            case 'slot-enter':
                return dispatch(ScenarioActions.HIGHLIGHT_RESOURCE({ resourceId: ev.id }));
            case 'slot-leave':
                return dispatch(ScenarioActions.UNHIGHLIGHT_RESOURCE({ resourceId: ev.id }));
            case 'slot-click':
                return handleClickActor(ev.id);
            case 'asset-enter':
                return dispatch(ScenarioActions.HIGHLIGHT_RESOURCE({ resourceId: ev.id }));
            case 'asset-click':
                return handleClickAsset(ev.id);
            case 'asset-leave':
                return dispatch(ScenarioActions.UNHIGHLIGHT_RESOURCE({ resourceId: ev.id }));
            case 'conn-enter':
                return dispatch(ScenarioActions.HIGHLIGHT_RESOURCE({ resourceId: ev.id }));
            case 'conn-leave':
                return dispatch(ScenarioActions.UNHIGHLIGHT_RESOURCE({ resourceId: ev.id }));
            case 'slot-delete':
                return dispatch(ProjectActions.REMOVE_ACTOR({ id: ev.id }));
        }
    };

    // TODO unhack me. Demonstrates use of modes so Actors are displayed to perform actions (e.g. taking a selfie)
    const modes = !currentStep
        ? {}
        : {
              [currentStep.action.from.id]: currentStep.action.from_mode,
              [currentStep.action.to.id]: currentStep.action.to_mode,
          };

    const elems = createNetworkCanvasData({
        height: 600,
        width: 600,
        state: currentState,
        actors: usedActors,
        modes,
        step: currentStep,
        selectedActorId,
        selectedAssetId,
        hoveredElemId: hoveredResource,
    });

    return <SVGNetworkCanvas elems={elems} onEvent={handleEvent} />;
}
