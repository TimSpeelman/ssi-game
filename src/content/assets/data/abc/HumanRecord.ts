import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset, AssetBaseProps } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    subjectId: string;
}

export class HumanRecord extends Asset<Props> {
    protected typeName = 'HumanRecord';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'HumanRecord',
        title: 'Administratief Beeld',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Administratief Beeld',
        };
    }
}
