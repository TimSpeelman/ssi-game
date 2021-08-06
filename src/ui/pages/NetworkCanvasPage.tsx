import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectActions } from '../../state/scenario/actions';
import {
    selectActiveStepDesc,
    selectFailedStepDesc,
    selectLang,
    selectScenarioDesc,
    selectShowMeta,
    selectSnackbarIsOn,
} from '../../state/scenario/selectors';
import { CanvasCtr } from '../components/Canvas/CanvasCtr';
import { replaceInternalResourceUrlStrings } from '../components/elements/replaceInternalResourceUrlStrings';
import { ScenarioMetaDialog } from '../components/Sidebar/InfoPanel/ScenarioMetaDialog';
import { Sidebar } from '../components/Sidebar/Sidebar';
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
                            {dict.networkCanvasPage_msgStepXFails.replace('{0}', `${scenarioDesc.failingAtIndex! + 1}`)}
                        </strong>
                    </div>
                )}
            </div>
            <Sidebar />
        </div>
    );
}
