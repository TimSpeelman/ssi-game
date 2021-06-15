import { Translation } from '../../../intl/Language';
import { Asset, AssetBaseProps, CustomAssetDesc } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';
import { AssetFormConfig } from '../../../model/view/AssetFormConfig';

export interface Props extends AssetBaseProps {
    secret: string;
}

const title: Translation = {
    NL: 'Physically Uncloneable Function (PUF)',
    EN: 'Physically Uncloneable Function (PUF)',
};
/**
 * A physically uncloneable function (PUF).
 *
 * "physical object that for a given input and conditions (challenge), provides a physically-defined "digital fingerprint" output (response) that serves as a unique identifier"
 * - https://en.wikipedia.org/wiki/Physical_unclonable_function
 */
export class PUF extends Asset<Props> {
    protected typeName = 'PUF';
    protected kindName = 'Physical';

    static config: AssetFormConfig<keyof Props> = {
        typeName: 'PUF',
        title: title,
        fields: {
            secret: {
                type: 'string',
                title: {
                    NL: 'Geheim',
                    EN: 'Secret',
                },
            },
        },
    };

    _describe(state: ScenarioState): CustomAssetDesc {
        return {
            sub: JSON.stringify(this.props),
            title: title,
        };
    }
}
