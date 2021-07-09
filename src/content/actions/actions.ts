import { ActionTypesCollection } from '../../model/content/Action/ActionTypesCollection';
import { IssuanceType } from './abc/Issuance';
import { PresentationType } from './abc/Presentation';
import { PresentationConsentType } from './abc/PresentationConsent';
import { PresentationRequestType } from './abc/PresentationRequest';
import { RevocationType } from './abc/Revocation';
import { PhysicalPassportAuthenticationType } from './authentication/PhysicalPassportAuthentication';
import { WalletQRAuthenticationType } from './authentication/WalletQRAuthentication';
import { WalletSMSAuthenticationType } from './authentication/WalletSMSAuthentication';
import { CustomInteractionType } from './CustomInteraction';
import { GrantGreenFlagType } from './GrantGreenFlag';

export const DefaultActionsCollection = new ActionTypesCollection([
    IssuanceType,
    PresentationType,
    PresentationConsentType,
    PresentationRequestType,
    RevocationType,
    PhysicalPassportAuthenticationType,
    WalletQRAuthenticationType,
    WalletSMSAuthenticationType,
    CustomInteractionType,
    GrantGreenFlagType,
]);
