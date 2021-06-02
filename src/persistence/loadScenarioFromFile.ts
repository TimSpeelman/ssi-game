import { ScenarioDef } from '../model/definition/ScenarioDef';

export function loadScenarioFromFile(jsonFile: File) {
    const reader = new FileReader();

    return new Promise<ScenarioDef>((resolve, reject) => {
        reader.onload = (e) => {
            const txt = reader.result;
            if (!txt) {
                reject('Bestand is leeg');
            }
            try {
                const parsedScenarioDefinition = JSON.parse(txt as string);
                resolve(parsedScenarioDefinition);
                reject('Bestand geladen!');
            } catch (e) {
                reject('Bestand kon niet gelezen worden');
            }
        };
        reader.readAsText(jsonFile, 'utf8');
    });
}
