import { AssetDesc } from '../../model/description/Asset/AssetDesc';
import { Asset } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../model/view/AssetFormConfig';

export interface Props {
    description: string;
}

export class GreenFlag extends Asset<Props> {
    protected typeName = GreenFlag.name;

    static config: AssetFormConfig<keyof Props> = {
        title: 'Groene Vlag',
        fields: {
            description: { type: 'string', title: 'Omschrijving' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: this.props.description,
            title: 'Groene Vlag',
        };
    }
}
