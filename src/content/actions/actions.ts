import { Action, SerializedAction } from '../../model/game/Action';
import { Issuance } from './abc/Issuance';
import { Presentation } from './abc/Presentation';
import { PresentationConsent } from './abc/PresentationConsent';
import { PresentationRequest } from './abc/PresentationRequest';
import { PhysicalPassportAuthentication } from './authentication/PhysicalPassportAuthentication';
import { WalletQRAuthentication } from './authentication/WalletQRAuthentication';
import { WalletSMSAuthentication } from './authentication/WalletSMSAuthentication';
import { CustomInteraction } from './CustomInteraction';
import { GrantGreenFlag } from './GrantGreenFlag';

export const Actions = {
    GrantGreenFlag,
    PhysicalPassportAuthentication,
    WalletQRAuthentication,
    WalletSMSAuthentication,
    Issuance,
    PresentationRequest,
    PresentationConsent,
    Presentation,
    CustomInteraction,
};

export function deserialize(s: SerializedAction<any>): Action<any> {
    // @ts-ignore
    const constructor: any = Actions[s.typeName];
    return new constructor(s.id, s.props);
}
