import { Group, Info, Settings, SwapHoriz, Timeline } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ActionPanel } from './ActionPanel/ActionPanel';
import { ActorPanel } from './ActorPanel/ActorPanel';
import { InfoPanel } from './InfoPanel/InfoPanel';
import { OptionPanel } from './OptionPanel/OptionPanel';
import { SequencePanel } from './SequencePanel/SequencePanel';
import { SidebarTab as Tab } from './SidebarTab';

const tabOrder = [Tab.INFO, Tab.ACTORS, Tab.TIMELINE, Tab.STEP, Tab.SETTINGS];

const sidebarItems: Record<Tab, { Icon: React.FC; Panel: React.FC }> = {
    [Tab.INFO]: { Icon: Info, Panel: InfoPanel },
    [Tab.ACTORS]: { Icon: Group, Panel: ActorPanel },
    [Tab.TIMELINE]: { Icon: Timeline, Panel: SequencePanel },
    [Tab.STEP]: { Icon: SwapHoriz, Panel: ActionPanel },
    [Tab.SETTINGS]: { Icon: Settings, Panel: OptionPanel },
};

/**
 * The sidebar contains all control panels
 */
export function Sidebar() {
    // TODO move active state outside, so we can control it externally.
    const [active, setActive] = useState(0);
    const panels = tabOrder.map((key: Tab) => sidebarItems[key]);
    return (
        <div className="sidebar">
            {panels.map(({ Panel }, i) => (
                <div className={classNames(['sidebar-panel', { active: i === active }])} key={i}>
                    <Panel />
                </div>
            ))}
            <div className="sidebar-menu">
                {panels.map(({ Icon }, i) => (
                    <div
                        className={classNames(['item', { active: i === active }])}
                        key={i}
                        onClick={() => setActive(i)}
                    >
                        <Icon />
                    </div>
                ))}
            </div>
        </div>
    );
}
