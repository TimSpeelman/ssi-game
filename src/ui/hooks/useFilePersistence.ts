import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { loadProjectFromFile } from '../../persistence/loadProjectFromFile';
import { saveProjectToFile } from '../../persistence/saveProjectToFile';
import { GameActions } from '../../state/actions';
import { selectPersistableProject } from '../../state/selectors';
import { useLang } from './useLang';

export function useFilePersistence() {
    const { dict } = useLang();
    const dispatch = useDispatch();
    const persistableProject = useSelector(selectPersistableProject);
    const saveToFile = () => saveProjectToFile(persistableProject);

    function loadFromFile(file: File) {
        return loadProjectFromFile(file)
            .then((project) => {
                // Replace the ID to prevent collisions
                const p = { ...project, id: uuid() };
                dispatch(GameActions.LOAD_PROJECT({ project: p }));
                dispatch(GameActions.ACTIVATE_PROJECT({ id: p.id }));
                alert(dict.projectDrawer.msgFileLoaded);
            })
            .catch((e) => alert(e));
    }

    return {
        saveToFile,
        loadFromFile,
    };
}
