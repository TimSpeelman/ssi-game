import { ActionTypesCollection } from '../../model/content/Action/ActionTypesCollection';
import { ActionDef } from '../../model/definition/Action/ActionDef';
import { Action } from '../../model/logic/Step/Action';
import { keyByFn } from '../../util/util';
import { Issuance, IssuanceType } from './abc/Issuance';
import { Presentation, PresentationType } from './abc/Presentation';
import { PresentationConsent, PresentationConsentType } from './abc/PresentationConsent';
import { PresentationRequest, PresentationRequestType } from './abc/PresentationRequest';
import { Revocation, RevocationType } from './abc/Revocation';
import {
    PhysicalPassportAuthentication,
    PhysicalPassportAuthenticationType,
} from './authentication/PhysicalPassportAuthentication';
import { WalletQRAuthentication, WalletQRAuthenticationType } from './authentication/WalletQRAuthentication';
import { WalletSMSAuthentication, WalletSMSAuthenticationType } from './authentication/WalletSMSAuthentication';
import { CustomInteraction, CustomInteractionType } from './CustomInteraction';
import { GrantGreenFlag, GrantGreenFlagType } from './GrantGreenFlag';

export const ActionTypes = [
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
];

export const ActionTypesRecord = keyByFn(ActionTypes, (a) => a.schema.typeName);

export const Actions = {
    GrantGreenFlag,
    PhysicalPassportAuthentication,
    WalletQRAuthentication,
    WalletSMSAuthentication,
    Issuance,
    Revocation,
    PresentationRequest,
    PresentationConsent,
    Presentation,
    CustomInteraction,
};

export const DefaultActionsCollection = new ActionTypesCollection(ActionTypes);

export function deserialize(s: ActionDef<any>): Action<any> {
    // @ts-ignore
    const constructor: any = Actions[s.typeName];
    return new constructor(s.id, s.props);
}

export function getFormHandler(s: ActionDef<any>): Action<any> {
    // @ts-ignore
    const constructor: any = Actions[s.typeName];
    return new constructor(s.id, s.props);
}
