import { AssetDesc } from '../../model/description/Asset/AssetDesc';
import { Asset, AssetBaseProps } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    description: string;
}

export class GreenFlag extends Asset<Props> {
    protected typeName = 'GreenFlag';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'GreenFlag',
        title: 'Groene Vlag',
        fields: {
            description: { type: 'string', title: 'Omschrijving' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            sub: this.props.description,
            title: 'Groene Vlag',
        };
    }
}
