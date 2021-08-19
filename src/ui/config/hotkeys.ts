export const hotkeys = {
    CLEAR_SELECTION: 'escape',

    TOGGLE_EDITING: 'l',

    UNDO: 'ctrl+z',
    REDO: ['ctrl+y', 'ctrl+shift+z'],

    // Time Control
    PREV_STEP: ['left', 'up'],
    NEXT_STEP: ['right', 'down'],
    FIRST_STEP: ['ctrl+left', 'ctrl+up'],
    LAST_STEP: ['ctrl+right', 'ctrl+down'],
    GOTO_STEP: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],

    // Sidebar Navigation
    TAB_INFO: 'z',
    TAB_ACTORS: 'x',
    TAB_ASSETS: 'c',
    TAB_TIMELINE: 'v',
    TAB_STEP: 'b',
    TAB_SETTINGS: 'n',

    SHOW_MANUAL: 'h',
};

export type HotKeyNames = keyof typeof hotkeys;

export type HandlerMap = Record<HotKeyNames, (keyEvent: KeyboardEvent) => void>;
