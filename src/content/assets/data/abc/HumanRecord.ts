import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';

export interface Props {
    subjectId: string;
}

export class HumanRecord extends Asset<Props> {
    protected typeName = HumanRecord.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Administratief Beeld',
        };
    }
}
