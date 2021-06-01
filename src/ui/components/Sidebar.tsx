import { Group, Info, Settings, SwapHoriz, Timeline } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ActionPanel } from './ActionPanel/ActionPanel';
import { ActorPanel } from './ActorPanel/ActorPanel';
import { InfoPanel } from './InfoPanel/InfoPanel';
import { OptionPanel } from './OptionPanel/OptionPanel';
import { SequencePanel } from './SequencePanel/SequencePanel';

const sidebarItems = [
    { Icon: Info, Panel: InfoPanel },
    { Icon: Group, Panel: ActorPanel },
    { Icon: Timeline, Panel: SequencePanel },
    { Icon: SwapHoriz, Panel: ActionPanel },
    { Icon: Settings, Panel: OptionPanel },
];

/**
 * The sidebar contains all control panels
 */
export function Sidebar() {
    // TODO move active state outside, so we can control it externally.
    const [active, setActive] = useState(0);
    return (
        <div className="sidebar">
            {sidebarItems.map(({ Panel }, i) => (
                <div className={classNames(['sidebar-panel', { active: i === active }])} key={i}>
                    <Panel />
                </div>
            ))}
            <div className="sidebar-menu">
                {sidebarItems.map(({ Icon }, i) => (
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
