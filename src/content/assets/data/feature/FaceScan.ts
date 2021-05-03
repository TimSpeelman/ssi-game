/** Scan of a face of a particular subject. */
export interface FacePortrait {
    kind: 'data';
    type: 'face';
    subjectId: string;
    id: string;
}
