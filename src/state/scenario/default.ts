import { OnlineLiquorPurchaseScenario } from '../../config/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioProps } from '../../data/scenario/Scenario';

export const defaultState: ScenarioProps = OnlineLiquorPurchaseScenario.props;

export const emptyState: ScenarioProps = {
    initial: {
        actors: {},
    },
    steps: [],
};
