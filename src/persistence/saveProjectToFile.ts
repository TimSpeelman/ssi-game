import FileSaver from 'file-saver';
import { PersistedProject } from '../state/scenario/persistence';

export function saveProjectToFile(scenario: PersistedProject) {
    const blob = new Blob([JSON.stringify(scenario)], { type: 'application/json;charset=utf-8' });
    const date = new Date().toLocaleString().replace(/:/g, '.');
    const fileName = `SSI-Game Scenario ${date}.json`;
    FileSaver.saveAs(blob, fileName);
}
