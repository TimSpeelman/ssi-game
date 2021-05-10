import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioProps } from '../../model/game/Scenario';
import { ScenarioState } from '../../model/game/ScenarioState';
import { RootState } from './state';

export const defaultScenario: ScenarioProps = OnlineLiquorPurchaseScenario.props;

export const emptyScenario: ScenarioProps = {
    initial: new ScenarioState({ byActor: {}, valid: true }),
    meta: {
        title: 'Scenario zonder naam',
        author: '',
        body: '(leeg)',
    },
    steps: [],
};

export const defaultState: RootState = {
    scenario: defaultScenario,
    showMeta: false,
    activeStepId: undefined,
    selectedActorId: undefined,
    selectedStepId: undefined,
    snackbarOn: true,
};
