import { OnlineLiquorPurchaseScenario } from '../../content/DigitalIdentity1/scenarios/OnlineLiquorPurchaseScenario';
import { makeProjectState, makeProjectWrapperState, ProjectStateWithHistory } from './state';

export const defaultScenario = OnlineLiquorPurchaseScenario;

export const defaultProjectState: ProjectStateWithHistory = makeProjectWrapperState(
    'DEFAULT',
    makeProjectState({
        scenario: defaultScenario,
    }),
);
