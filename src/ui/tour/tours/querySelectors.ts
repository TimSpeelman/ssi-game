import { SidebarTab } from '../../components/Sidebar/SidebarTab';

/** A list of query selectors for highlighting purposes */
export const querySelectors = {
    actorDetailsAssetsSection: '#actor-assets',
    actorDetailsPropertiesSection: '#actor-properties',
    btnNavigateToActorIndex: '#btn-all-actors',
    btnEditLock: '#btn-editing',
    btnGotoInitialState: '#btn-goto-initial-state',
    btnHelp: `#btn-help`,
    canvas: '#network-svg-root',
    menuItem: {
        [SidebarTab.INFO]: `#sidebar-menu-item-${SidebarTab.INFO}`,
        [SidebarTab.ACTORS]: `#sidebar-menu-item-${SidebarTab.ACTORS}`,
        [SidebarTab.ASSETS]: `#sidebar-menu-item-${SidebarTab.ASSETS}`,
        [SidebarTab.TIMELINE]: `#sidebar-menu-item-${SidebarTab.TIMELINE}`,
        [SidebarTab.STEP]: `#sidebar-menu-item-${SidebarTab.STEP}`,
        [SidebarTab.SETTINGS]: `#sidebar-menu-item-${SidebarTab.SETTINGS}`,
    },
    stepDetailsOutcomesSection: `#outcome-list`,
    projectDrawer: `#project-drawer`,
    scenarioStatusIndicator: '.scenario-status',
    sidebar: `.sidebar`,
    sidebarMainSection: '.sidebar-main',
    timeNavigationControls: '.time-navigation',
};
