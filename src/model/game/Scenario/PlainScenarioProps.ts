import { PlainAction } from '../Action/PlainAction';
import { ScenarioConfig } from './Config/ScenarioConfig';

export interface PlainScenarioProps {
    config: ScenarioConfig;
    steps: PlainAction[];
}
