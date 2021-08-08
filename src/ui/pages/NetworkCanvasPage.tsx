import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../state/actions';
import { ProjectActions } from '../../state/project/actions';
import {
    selectActiveStepDesc,
    selectFailedStepDesc,
    selectLang,
    selectScenarioDesc,
    selectShowMeta,
    selectSnackbarIsOn,
} from '../../state/selectors';
import { formatL } from '../../util/util';
import { CanvasCtr } from '../components/Canvas/CanvasCtr';
import { replaceInternalResourceUrlStrings } from '../components/elements/replaceInternalResourceUrlStrings';
import { ScenarioMetaDialog } from '../components/Sidebar/InfoPanel/ScenarioMetaDialog';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SidebarTab } from '../components/Sidebar/SidebarTab';
import { useLang } from '../hooks/useLang';

export function NetworkCanvas() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const snackbarIsOn = useSelector(selectSnackbarIsOn);
    const currentStep = useSelector(selectActiveStepDesc);
    const failedStep = useSelector(selectFailedStepDesc);
    const showMeta = useSelector(selectShowMeta);
    const lang = useSelector(selectLang);
    const scenarioDesc = useSelector(selectScenarioDesc);

    useEffect(() => {
        closeSnackbar();
        if (currentStep && snackbarIsOn) {
            currentStep.outcomes.forEach((o) => enqueueSnackbar(replaceInternalResourceUrlStrings(o[lang])));
        }
    }, [currentStep]);

    const { dict } = useLang();

    function showFailingStep() {
        if (failedStep) {
            dispatch(ProjectActions.GOTO_STEP({ id: failedStep.action.id }));
            dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.STEP }));
        }
    }

    return (
        <div className="network-canvas">
            <ScenarioMetaDialog
                meta={scenarioDesc.definition.meta}
                open={showMeta}
                handleClose={() => dispatch(ProjectActions.HIDE_META())}
            />

            <div className="canvasarea">
                <CanvasCtr />
                {failedStep && (
                    <div className="scenario-status">
                        <strong>
                            {formatL(dict.networkCanvasPage.msgStepXFails, [scenarioDesc.failingAtIndex! + 1])}
                        </strong>
                        <Button
                            variant={'outlined'}
                            color={'inherit'}
                            onClick={showFailingStep}
                            style={{ marginLeft: '1em' }}
                        >
                            Tonen
                        </Button>
                    </div>
                )}
            </div>
            <Sidebar />
        </div>
    );
}
