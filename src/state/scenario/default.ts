import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { Language } from '../../intl/Language';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { RootState } from './state';

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
    scenario: defaultScenario,
    showMeta: true,
    activeStepId: undefined,
    selectedActorId: undefined,
    selectedStepId: undefined,
    snackbarOn: false,
    activeSidebarTab: SidebarTab.TIMELINE,
    language: Language.NL,
};
