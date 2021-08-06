import { Category, Group, Info, Settings, SwapHoriz, Timeline } from '@material-ui/icons';
import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../../state/scenario/actions';
import { selectActiveSidebarTab } from '../../../state/scenario/selectors';
import { TimeControlCtr } from '../Canvas/TimeControlCtr';
import { ActionPanel } from './ActionPanel/ActionPanel';
import { ActorPanel } from './ActorPanel/ActorPanel';
import { AssetPanel } from './AssetPanel/AssetPanel';
import { InfoPanel } from './InfoPanel/InfoPanel';
import { OptionPanel } from './OptionPanel/OptionPanel';
import { SequencePanel } from './SequencePanel/SequencePanel';
import { SidebarTab as Tab } from './SidebarTab';

const tabOrder = [Tab.INFO, Tab.ACTORS, Tab.ASSETS, Tab.TIMELINE, Tab.STEP, Tab.SETTINGS];

const sidebarItems: Record<Tab, { Icon: React.FC; Panel: React.FC }> = {
    [Tab.INFO]: { Icon: Info, Panel: InfoPanel },
    [Tab.ACTORS]: { Icon: Group, Panel: ActorPanel },
    [Tab.ASSETS]: { Icon: Category, Panel: AssetPanel },
    [Tab.TIMELINE]: { Icon: Timeline, Panel: SequencePanel },
    [Tab.STEP]: { Icon: SwapHoriz, Panel: ActionPanel },
    [Tab.SETTINGS]: { Icon: Settings, Panel: OptionPanel },
};

/**
 * The sidebar contains all control panels
 */
export function Sidebar() {
    // TODO move active state outside, so we can control it externally.
    const active = useSelector(selectActiveSidebarTab);
    const dispatch = useDispatch();
    const panels = tabOrder.map((key: Tab) => ({ ...sidebarItems[key], key }));
    return (
        <div className="sidebar">
            <div className="sidebar-main">
                {panels.map(({ Panel }, i) => (
                    <div className={classNames(['sidebar-panel', { active: i === active }])} key={i}>
                        <Panel />
                    </div>
                ))}
                <div className="sidebar-menu">
                    {panels.map(({ Icon, key }, i) => (
                        <div
                            className={classNames(['item', { active: i === active }])}
                            key={key}
                            onClick={() => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: key }))}
                        >
                            <Icon />
                        </div>
                    ))}
                </div>
            </div>
            <div className="time-control">
                <TimeControlCtr />
            </div>
        </div>
    );
}
