import { PlainScenario } from '../model/game/Scenario/PlainScenario';

export function saveScenarioToLocalStorage(scenario: PlainScenario): void {
    localStorage.setItem('scenario', JSON.stringify(scenario));
}
