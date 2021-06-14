import { Asset, AssetBaseProps } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

export class FaceFeature extends Asset<Props> {
    protected typeName = 'FaceFeature';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'FaceFeature',
        title: 'Gezicht',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
        },
    };

    _describe(state: ScenarioState) {
        return {
            sub: JSON.stringify(this.props),
            title: 'Gezicht',
        };
    }
}
