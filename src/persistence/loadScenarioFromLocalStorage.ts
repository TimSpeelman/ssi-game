import { ScenarioDef } from '../model/definition/ScenarioDef';

export function loadScenarioFromLocalStorage(): ScenarioDef | undefined {
    const storedScenarioDefinition = localStorage.getItem('scenario');
    if (storedScenarioDefinition) {
        try {
            const parsedScenarioDefinition = JSON.parse(storedScenarioDefinition);
            return parsedScenarioDefinition;
        } catch (e) {
            console.error('Recovery from local storage failed, clearing it');
            return;
        }
    }
}
