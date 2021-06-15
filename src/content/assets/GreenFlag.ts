import { translations } from '../../intl/dictionaries';
import { Translation } from '../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../model/logic/Asset/Asset';
import { ScenarioState } from '../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    description: string;
}

const title: Translation = {
    NL: 'Groene Vlag',
    EN: 'Green Flag',
};

export class GreenFlag extends Asset<Props> {
    protected typeName = 'GreenFlag';
    protected kindName = 'Flag';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'GreenFlag',
        title: title,
        fields: {
            description: { type: 'string', title: translations.description },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: this.props.description,
            title: title,
        };
    }
}
