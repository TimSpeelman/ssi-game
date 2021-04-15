/** Possession means that the subject has these fingerprints. Non-transferrable. FingerprintScan can however be transferred. */
export interface FingerprintFeature {
    kind: 'feature';
    type: 'fingerprint';
    id: string;
}
