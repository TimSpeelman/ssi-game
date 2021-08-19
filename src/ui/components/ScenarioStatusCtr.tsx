import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActions } from '../../state/actions';
import { ProjectActions } from '../../state/project/actions';
import { selectFailedStepDesc, selectScenarioDesc } from '../../state/selectors';
import { formatL } from '../../util/util';
import { useLang } from '../hooks/useLang';
import { SidebarTab } from './Sidebar/SidebarTab';

export function ScenarioStatusCtr() {
    const failedStep = useSelector(selectFailedStepDesc);
    const { dict } = useLang();
    const dispatch = useDispatch();
    const scenarioDesc = useSelector(selectScenarioDesc);

    function showFailingStep() {
        if (failedStep) {
            dispatch(ProjectActions.GOTO_STEP({ id: failedStep.action.id }));
            dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.STEP }));
        }
    }

    return failedStep ? (
        <div className="scenario-status">
            <strong>{formatL(dict.networkCanvasPage.msgStepXFails, [scenarioDesc.failingAtIndex! + 1])}</strong>
            <Button variant={'outlined'} color={'inherit'} onClick={showFailingStep} style={{ marginLeft: '1em' }}>
                {dict.misc.btnShow}
            </Button>
        </div>
    ) : (
        <div></div>
    );
}
