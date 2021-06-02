import FileSaver from 'file-saver';
import { PlainScenario } from '../model/game/Scenario/PlainScenario';

export function saveScenarioToFile(scenario: PlainScenario) {
    const blob = new Blob([JSON.stringify(scenario)], { type: 'application/json;charset=utf-8' });
    const date = new Date().toLocaleString().replace(/:/g, '.');
    const fileName = `SSI-Game Scenario ${date}.json`;
    FileSaver.saveAs(blob, fileName);
}
