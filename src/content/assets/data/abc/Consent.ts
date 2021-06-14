import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset, AssetBaseProps } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    attributeName: string;
    verifierId: string;
    subjectId: string;
}

export class Consent extends Asset<Props> {
    protected typeName = 'Consent';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'Consent',
        title: 'Toestemming',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            verifierId: { type: 'actor', title: 'Verifier' },
            attributeName: { type: 'string', title: 'Attribuutnaam' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Toestemming',
        };
    }
}
