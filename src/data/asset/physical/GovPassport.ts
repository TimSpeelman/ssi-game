import { FacePortrait } from '../data/feature/FaceScan';

export interface GovPassport {
    kind: 'physical';
    type: 'gov-passport';
    id: string;
    name: string;
    photo: FacePortrait;
}
