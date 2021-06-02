import { ScenarioDef } from '../model/definition/ScenarioDef';

export function saveScenarioToLocalStorage(scenario: ScenarioDef): void {
    localStorage.setItem('scenario', JSON.stringify(scenario));
}
