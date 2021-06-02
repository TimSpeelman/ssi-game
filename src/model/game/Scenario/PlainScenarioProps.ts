import { PlainAction } from '../Action/PlainAction';
import { ScenarioConfig } from './ScenarioConfig';

export interface PlainScenarioProps {
    config: ScenarioConfig;
    steps: PlainAction[];
}
