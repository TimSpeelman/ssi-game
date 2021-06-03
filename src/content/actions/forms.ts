import { Issuance } from './abc/Issuance';
import { Presentation } from './abc/Presentation';
import { PresentationConsent } from './abc/PresentationConsent';
import { PresentationRequest } from './abc/PresentationRequest';
import { PhysicalPassportAuthentication } from './authentication/PhysicalPassportAuthentication';
import { WalletQRAuthentication } from './authentication/WalletQRAuthentication';
import { WalletSMSAuthentication } from './authentication/WalletSMSAuthentication';
import { CustomInteraction } from './CustomInteraction';
import { GrantGreenFlag } from './GrantGreenFlag';

export const ActionForms = [
    GrantGreenFlag,
    PhysicalPassportAuthentication,
    WalletQRAuthentication,
    WalletSMSAuthentication,
    Issuance,
    PresentationRequest,
    PresentationConsent,
    Presentation,
    CustomInteraction,
].map((c) => c.config);
