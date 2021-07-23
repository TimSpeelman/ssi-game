import React, { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions, ScenarioActions } from '../../state/scenario/actions';
import { selectActiveStateDesc } from '../../state/scenario/selectors';
import { SidebarTab } from './Sidebar/SidebarTab';

export interface Props {
    url: string;
}

export function InternalResourceUrl({ url, children }: PropsWithChildren<Props>) {
    const dispatch = useDispatch();
    const state = useSelector(selectActiveStateDesc);
    const resources = state.resources;
    const resourceId = url.substr(1); // TODO FIXME
    const resource = resources[resourceId];

    function nav() {
        if (resource) {
            if (resource.type === 'asset') {
                dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS }));
                dispatch(ProjectActions.SELECT_ASSET({ id: resourceId }));
            }
            if (resource.type === 'actor') {
                dispatch(ScenarioActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
                dispatch(ProjectActions.SELECT_ACTOR({ id: resourceId }));
            }
        }
    }

    return (
        <span
            className="internal-resource-url"
            onClick={nav}
            onMouseEnter={() => dispatch(ScenarioActions.HIGHLIGHT_RESOURCE({ resourceId }))}
            onMouseLeave={() => dispatch(ScenarioActions.UNHIGHLIGHT_RESOURCE({ resourceId }))}
        >
            {children}
        </span>
    );
}
