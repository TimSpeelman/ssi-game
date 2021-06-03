import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props {
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

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Gezicht',
        };
    }
}
