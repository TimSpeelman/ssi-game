import { Scenario } from '../model/game/Scenario/Scenario';

export function loadScenarioFromFile(jsonFile: File) {
    const reader = new FileReader();

    return new Promise<Scenario>((resolve, reject) => {
        reader.onload = (e) => {
            const txt = reader.result;
            if (!txt) {
                reject('Bestand is leeg');
            }
            try {
                const parsed = JSON.parse(txt as string);
                const scenario = Scenario.deserialize(parsed);
                resolve(scenario);
                reject('Bestand geladen!');
            } catch (e) {
                reject('Bestand kon niet gelezen worden');
            }
        };
        reader.readAsText(jsonFile, 'utf8');
    });
}
