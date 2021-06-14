import { Asset, AssetBaseProps, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    description: string;
}

export class GreenFlag extends Asset<Props> {
    protected typeName = 'GreenFlag';
    protected kindName = 'Flag';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'GreenFlag',
        title: 'Groene Vlag',
        fields: {
            description: { type: 'string', title: 'Omschrijving' },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: this.props.description,
            title: 'Groene Vlag',
        };
    }
}
