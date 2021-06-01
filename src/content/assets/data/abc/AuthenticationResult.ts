export interface AuthenticationResult {
    kind: 'data';
    type: 'authentication-result';
    id: string;
    sourceId: string;
    targetId: string;
}
