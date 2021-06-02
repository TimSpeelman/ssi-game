import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { Scenario } from '../../model/game/Scenario/Scenario';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { RootState } from './state';

export const defaultScenario = OnlineLiquorPurchaseScenario;

export const emptyScenario = new Scenario({
    config: {
        actors: [],
        meta: {
            title: 'Scenario zonder naam',
            author: '',
            body: '(leeg)',
        },
    },
    steps: [],
});

export const defaultState: RootState = {
    scenario: defaultScenario.serialize().props,
    showMeta: true,
    activeStepId: undefined,
    selectedActorId: undefined,
    selectedStepId: undefined,
    snackbarOn: false,
    activeSidebarTab: SidebarTab.INFO,
};
