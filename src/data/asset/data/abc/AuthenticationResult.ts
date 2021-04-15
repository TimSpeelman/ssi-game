export interface AuthenticationResult {
    kind: 'data';
    type: 'authentication-result';
    sourceId: string;
    targetId: string;
}
