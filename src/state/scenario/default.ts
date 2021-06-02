import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioProps } from '../../model/game/Scenario/Scenario';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';
import { RootState } from './state';

export const defaultScenario: ScenarioProps = OnlineLiquorPurchaseScenario.props;

export const emptyScenario: ScenarioProps = {
    config: {
        actors: [],
        meta: {
            title: 'Scenario zonder naam',
            author: '',
            body: '(leeg)',
        },
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
    activeSidebarTab: SidebarTab.INFO,
};
