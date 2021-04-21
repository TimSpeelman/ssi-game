import FileSaver from 'file-saver';
import { Scenario } from '../data/scenario/Scenario';

export function saveScenarioToFile(scenario: Scenario) {
    const blob = new Blob([JSON.stringify(scenario.serialize())], { type: 'application/json;charset=utf-8' });
    const date = new Date().toLocaleString().replace(/:/g, '.');
    const fileName = `SSI-Game Scenario ${date}.json`;
    FileSaver.saveAs(blob, fileName);
}
