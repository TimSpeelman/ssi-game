import React, { ReactNode, useEffect, useRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { GameActions } from '../../state/actions';
import { ProjectActions } from '../../state/project/actions';
import { HandlerMap, hotkeys } from '../config/hotkeys';
import { SidebarTab } from './Sidebar/SidebarTab';

export function HotKeysContainer({ children, autoFocus }: { children: ReactNode; autoFocus?: boolean }) {
    const dispatch = useDispatch();

    const keyHandlers: HandlerMap = {
        CLEAR_SELECTION: () => dispatch(ProjectActions.CLEAR_SELECTION()),

        TOGGLE_EDITING: () => dispatch(GameActions.TOGGLE_EDITING({})),

        UNDO: () => dispatch(ActionCreators.undo()),
        REDO: () => dispatch(ActionCreators.redo()),

        // Time Control
        FIRST_STEP: () => dispatch(ProjectActions.FIRST_STEP()),
        PREV_STEP: () => dispatch(ProjectActions.PREV_STEP()),
        NEXT_STEP: () => dispatch(ProjectActions.NEXT_STEP()),
        LAST_STEP: () => dispatch(ProjectActions.LAST_STEP()),
        GOTO_STEP: (e: any) => dispatch(ProjectActions.GOTO_STEP_INDEX({ index: parseInt(e.key, 10) - 1 })),

        // Sidebar Navigation
        TAB_INFO: () => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.INFO })),
        TAB_ACTORS: () => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS })),
        TAB_ASSETS: () => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ASSETS })),
        TAB_TIMELINE: () => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.TIMELINE })),
        TAB_STEP: () => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.STEP })),
        TAB_SETTINGS: () => dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.SETTINGS })),

        SHOW_MANUAL: () => dispatch(GameActions.SHOW_MANUAL()),
    };

    const hotKeysRef = useRef<HTMLElement>();

    // When this element is rendered, auto-focus on it to ensure hotkeys are caught immediately
    useEffect(() => {
        if (autoFocus && hotKeysRef && hotKeysRef.current) {
            hotKeysRef.current.focus();
        }
    }, [hotKeysRef]);

    return (
        <HotKeys keyMap={hotkeys} root={true} handlers={keyHandlers} className="fill" innerRef={hotKeysRef as any}>
            {children}
        </HotKeys>
    );
}
