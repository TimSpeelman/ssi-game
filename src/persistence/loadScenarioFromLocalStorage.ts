import { Scenario } from '../model/game/Scenario';

export function loadScenarioFromLocalStorage(): Scenario | undefined {
    const storedScenario = localStorage.getItem('scenario');
    if (storedScenario) {
        try {
            const scenario = Scenario.deserialize(JSON.parse(storedScenario));
            return scenario;
        } catch (e) {
            console.error('Recovery from local storage failed, clearing it');
            return;
        }
    }
}
