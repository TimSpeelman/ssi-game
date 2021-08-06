import React from 'react';
import { useSelector } from 'react-redux';
import { selectScenarioMeta } from '../../../../state/selectors';
import { ScenarioInspector } from './ScenarioInspector';

/** The InfoPanel describes the Scenario's Information */
export function InfoPanel() {
    const meta = useSelector(selectScenarioMeta);

    return (
        <div>
            <ScenarioInspector meta={meta} />
        </div>
    );
}
