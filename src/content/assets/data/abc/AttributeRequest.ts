import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset, AssetBaseProps } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    name: string;
    verifierId: string;
    subjectId: string;
}

export class AttributeRequest extends Asset<Props> {
    protected typeName = 'AttributeRequest';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'AttributeRequest',
        title: 'AttribuutVerzoek',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            verifierId: { type: 'actor', title: 'Verifier' },
            name: { type: 'string', title: 'Attribuutnaam' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'AttribuutVerzoek',
        };
    }
}
