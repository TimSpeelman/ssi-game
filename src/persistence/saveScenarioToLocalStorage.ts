import { Scenario } from '../data/scenario/Scenario';

export function saveScenarioToLocalStorage(scenario: Scenario): void {
    localStorage.setItem('scenario', JSON.stringify(scenario.serialize()));
}
