import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
import { Asset, AssetBaseProps } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    secret: string;
}

/**
 * A physically uncloneable function (PUF).
 *
 * "physical object that for a given input and conditions (challenge), provides a physically-defined "digital fingerprint" output (response) that serves as a unique identifier"
 * - https://en.wikipedia.org/wiki/Physical_unclonable_function
 */
export class PUF extends Asset<Props> {
    protected typeName = 'PUF';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'PUF',
        title: 'Physically Uncloneable Function (PUF)',
        fields: {
            secret: { type: 'string', title: 'Geheim' },
        },
    };

    describe(state: ScenarioState): AssetDesc {
        return {
            parentId: this.props.parentId,
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Physically Uncloneable Function (PUF)',
        };
    }
}
