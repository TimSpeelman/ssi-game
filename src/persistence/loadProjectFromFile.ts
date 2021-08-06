import { PersistedProject } from './persistence';

export function loadProjectFromFile(jsonFile: File) {
    const reader = new FileReader();

    return new Promise<PersistedProject>((resolve, reject) => {
        reader.onload = (e) => {
            const txt = reader.result;
            if (!txt) {
                reject('Bestand is leeg');
            }
            try {
                const parsedScenarioDefinition = JSON.parse(txt as string);
                resolve(parsedScenarioDefinition);
            } catch (e) {
                reject('Bestand kon niet gelezen worden');
            }
        };
        reader.readAsText(jsonFile, 'utf8');
    });
}
