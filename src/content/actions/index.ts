import { ActionTypesCollection } from '../../model/content/Action/ActionTypesCollection';
import { CustomInteractionType } from './CustomInteraction';
import { GrantGreenFlagType } from './GrantGreenFlag';
import { HandoverType } from './Handover';
import { IssuanceType } from './Issuance';
import { PhysicalPassportAuthenticationType } from './PhysicalPassportAuthentication';
import { PresentationType } from './Presentation';
import { PresentationConsentType } from './PresentationConsent';
import { PresentationRequestType } from './PresentationRequest';
import { RevocationType } from './Revocation';
import { WalletQRAuthenticationType } from './WalletQRAuthentication';
import { WalletSMSAuthenticationType } from './WalletSMSAuthentication';

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
    HandoverType,
]);
