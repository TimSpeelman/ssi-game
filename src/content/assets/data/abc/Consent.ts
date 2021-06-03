import { AssetDesc } from '../../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../../model/view/AssetFormConfig';

export interface Props {
    attributeName: string;
    verifierId: string;
    subjectId: string;
}

export class Consent extends Asset<Props> {
    protected typeName = 'Consent';

    static config: AssetFormConfig<keyof Props> = {
        title: 'Toestemming',
        fields: {
            subjectId: { type: 'actor', title: 'Subject' },
            verifierId: { type: 'actor', title: 'Verifier' },
            attributeName: { type: 'string', title: 'Attribuutnaam' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Toestemming',
        };
    }
}
