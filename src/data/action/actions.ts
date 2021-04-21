import { Issuance } from './abc/Issuance';
import { Presentation } from './abc/Presentation';
import { PresentationConsent } from './abc/PresentationConsent';
import { PresentationRequest } from './abc/PresentationRequest';
import { PhysicalPassportAuthentication } from './authentication/PhysicalPassportAuthentication';
import { WalletQRAuthentication } from './authentication/WalletQRAuthentication';
import { WalletSMSAuthentication } from './authentication/WalletSMSAuthentication';
import { CustomInteraction } from './CustomInteraction';
import { GrantGreenFlag } from './GrantGreenFlag';
import { IAction, SerializedAction } from './IAction';

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

export function deserialize(s: SerializedAction<any>): IAction<any> {
    // @ts-ignore
    const constructor: any = Actions[s.typeName];
    return new constructor(s.id, s.props);
}
