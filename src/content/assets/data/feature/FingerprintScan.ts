/** Scan of a fingerprint of a particular subject. */
export interface FingerprintScan {
    kind: 'data';
    type: 'fingerprint-scan';
    subjectId: string;
    id: string;
}
