import { OnlineLiquorPurchaseScenario } from '../../content/DigitalIdentity1/scenarios/OnlineLiquorPurchaseScenario';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { ProjectState } from './state';

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

export const defaultProjectState: ProjectState = {
    id: '',
    name: 'Untitled 1',
    scenario: defaultScenario,
    showMeta: true,
    activeStepId: undefined,
    selectedActorId: undefined,
    selectedStepId: undefined,
};

export const emptyProjectState: ProjectState = {
    id: '',
    name: '',
    scenario: emptyScenario,
    showMeta: false,
};
