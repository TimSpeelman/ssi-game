import { Scenario } from '../model/game/Scenario';

export function saveScenarioToLocalStorage(scenario: Scenario): void {
    localStorage.setItem('scenario', JSON.stringify(scenario.serialize()));
}
