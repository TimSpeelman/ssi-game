import { useHistory } from 'react-router-dom';

/** Access to the browser navigation. */
export function useNav() {
    const history = useHistory(); // WARNING: undefined on the first page load

    return {
        goto: (loc: string) => history?.push(loc),
        pathTo: (loc: string) => loc,
        goBack: history?.goBack,
        history,
    };
}
