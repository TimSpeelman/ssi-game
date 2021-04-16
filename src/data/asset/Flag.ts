/** The flag describes the outcome of the identity process, an authorisation or rejection */
export interface GreenFlag {
    kind: 'flag';
    type: 'green-flag';
    success: boolean;
    description: string;
}
