import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../state/project/actions';
import {
    selectActiveStepDesc,
    selectLang,
    selectScenarioDesc,
    selectShowMeta,
    selectSnackbarIsOn,
} from '../../state/selectors';
import { GlobalDialogRouter } from '../dialogs/GlobalDialogRouter';
import { CanvasCtr } from './Canvas/CanvasCtr';
import { replaceInternalResourceUrlStrings } from './elements/replaceInternalResourceUrlStrings';
import { HotKeysContainer } from './HotKeysContainer';
import { UserManualDialogCtr } from './Manual/UserManualDialogCtr';
import { ProjectDrawer } from './menus/ProjectDrawer';
import { TopMenu } from './menus/TopMenu';
import { ScenarioStatusCtr } from './ScenarioStatusCtr';
import { ScenarioMetaDialog } from './Sidebar/InfoPanel/ScenarioMetaDialog';
import { Sidebar } from './Sidebar/Sidebar';

export function NetworkViewerCtr() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const currentStep = useSelector(selectActiveStepDesc);
    const showMeta = useSelector(selectShowMeta);
    const lang = useSelector(selectLang);
    const scenarioDesc = useSelector(selectScenarioDesc);

    useEffect(() => {
        closeSnackbar();
        if (currentStep && snackbarIsOn) {
            currentStep.outcomes.forEach((o) => enqueueSnackbar(replaceInternalResourceUrlStrings(o[lang])));
        }
    }, [currentStep]);

    return (
        <HotKeysContainer autoFocus>
            <UserManualDialogCtr />

            <GlobalDialogRouter />

            <ProjectDrawer />

            <TopMenu />

            <div className="network-canvas">
                <ScenarioMetaDialog
                    meta={scenarioDesc.definition.meta}
                    open={showMeta}
                    handleClose={() => dispatch(ProjectActions.HIDE_META())}
                />

                <div className="canvasarea">
                    <CanvasCtr />
                    <ScenarioStatusCtr />
                </div>
                <Sidebar />
            </div>
        </HotKeysContainer>
    );
}
