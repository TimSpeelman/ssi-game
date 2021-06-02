import { AssetDesc } from '../../../model/description/Asset/AssetDesc';
import { Asset } from '../../../model/logic/Asset/Asset';
import { ScenarioState } from '../../../model/logic/State/ScenarioState';

export interface Props {
    secret: string;
}

/**
 * A physically uncloneable function (PUF).
 *
 * "physical object that for a given input and conditions (challenge), provides a physically-defined "digital fingerprint" output (response) that serves as a unique identifier"
 * - https://en.wikipedia.org/wiki/Physical_unclonable_function
 */
export class PUF extends Asset<Props> {
    protected typeName = PUF.name;

    describe(state: ScenarioState): AssetDesc {
        return {
            id: this.id,
            type: this.typeName,
            sub: JSON.stringify(this.props),
            title: 'Physically Uncloneable Function (PUF)',
        };
    }
}
