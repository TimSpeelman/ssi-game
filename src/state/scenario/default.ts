import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioProps } from '../../model/game/Scenario';
import { ScenarioState } from './state';

export const defaultScenario: ScenarioProps = OnlineLiquorPurchaseScenario.props;

export const emptyScenario: ScenarioProps = {
    initial: {
        actors: {},
    },
    steps: [],
};

export const defaultState: ScenarioState = {
    scenario: defaultScenario,
    activeStepId: undefined,
    selectedActorId: undefined,
    selectedStepId: undefined,
    snackbarOn: true,
};
