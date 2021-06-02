import { AssetDesc } from '../../model/description/Asset/AssetDesc';
import { Asset } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';

export interface Props {
    description: string;
}

export class GreenFlag extends Asset<Props> {
    protected typeName = GreenFlag.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: this.props.description,
            title: 'Groene Vlag',
        };
    }
}
