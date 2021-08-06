import { ScenarioDef } from '../../model/definition/Scenario/ScenarioDef';

export interface ProjectState {
    id: string;
    name: string;
    scenario: ScenarioDef;
    showMeta: boolean;

    selectedActorId?: string;
    selectedAssetId?: string;
    selectedStepId?: string;
    activeStepId?: string;
}
