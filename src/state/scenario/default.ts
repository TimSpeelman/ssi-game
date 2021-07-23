import { newHistory } from 'redux-undo';
import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { Language } from '../../intl/Language';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { ProjectState, RootState } from './state';

export const defaultScenario = OnlineLiquorPurchaseScenario;

export const emptyScenario: ScenarioDef = {
    actors: [],
    meta: {
        title: 'Scenario zonder naam',
        author: '',
        body: '(leeg)',
    },
    steps: [],
};

export const defaultState: RootState = {
    inactiveProjects: [],
    activeProject: newHistory(
        [],
        {
            id: '',
            name: 'Untitled 1',
            scenario: defaultScenario,
            showMeta: true,
            activeStepId: undefined,
            selectedActorId: undefined,
            selectedStepId: undefined,
        },
        [],
    ),
    snackbarOn: false,
    projectDrawerOpen: false,
    activeSidebarTab: SidebarTab.TIMELINE,
    language: Language.NL,
};

export const emptyProjectState: ProjectState = {
    id: '',
    name: '',
    scenario: emptyScenario,
    showMeta: false,
};
