import { Group, Info, Timeline } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { InfoPanel } from './InfoPanel/InfoPanel';

const sidebarItems = [
    { Icon: Info, Panel: InfoPanel },
    {
        Icon: Group,
        Panel: function GroupPanel() {
            return <div>Group</div>;
        },
    },
    {
        Icon: Timeline,
        Panel: function TimelinePanel() {
            return <div>Timeline</div>;
        },
    },
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
