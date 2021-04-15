/** Scan of a face of a particular subject. */
export interface FaceScan {
    kind: 'data';
    type: 'face';
    subjectId: string;
    id: string;
}
