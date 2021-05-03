/** Possession denotes that the subject has this face. Non-transferrable. FaceScan can however be transferred. */
export interface FaceFeature {
    kind: 'feature';
    type: 'face';
    id: string;
}
