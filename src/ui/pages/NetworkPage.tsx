import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromLocalStorage, saveToLocalStorage } from '../../persistence/localStorage';
import { selectPersistedState } from '../../persistence/persistence';
import { GameActions } from '../../state/actions';
import { root, selectStepDescs } from '../../state/selectors';
import { GameState } from '../../state/state';
import { throttle1 } from '../../util/util';
import { HotKeysContainer } from '../components/HotKeysContainer';
import { NetworkViewerCtr } from '../components/NetworkViewerCtr';

export function NetworkPage() {
    const dispatch = useDispatch();
    const rootState = useSelector(root);

    useEffect(() => {
        const savedState = loadFromLocalStorage('state');
        if (savedState) {
            dispatch(GameActions.RESTORE_STATE({ state: savedState }));
        }
    }, []);

    const update = useMemo(
        () =>
            throttle1((state: GameState) => {
                console.log('TRTL', selectStepDescs({ scenario: state }).length);
                const persistable = selectPersistedState(state);
                saveToLocalStorage('state', persistable);
            }, 1500),
        [],
    );

    // Sync saved state
    useEffect(() => {
        update(rootState);
    }, [rootState]);

    return (
        <HotKeysContainer>
            <NetworkViewerCtr />
        </HotKeysContainer>
    );
}
