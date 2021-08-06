import gov1 from '../images/actors/gov1.png';
import gov1_issuing from '../images/actors/gov1_issuing.png';
import ledger1 from '../images/actors/ledger1.png';
import office1 from '../images/actors/office1.png';
import office2 from '../images/actors/office2.png';
import office3 from '../images/actors/office3.png';
import person1 from '../images/actors/person1.png';
import person2 from '../images/actors/person2.png';
import person3 from '../images/actors/person3.png';
import person3_facescan from '../images/actors/person3_facescan.png';
import person3_phone from '../images/actors/person3_phone.png';
import person3_selfie from '../images/actors/person3_selfie.png';
import shop1 from '../images/actors/shop1.png';

const images = {
    office1,
    office2,
    office3,
    person1,
    person2,
    person3,
    person3_facescan,
    person3_selfie,
    person3_phone,
    gov1,
    gov1_issuing,
    shop1,
    ledger1,
};

export type ImgName = keyof typeof images;

export function actorImage(name: string): string {
    if (!(name in images)) throw new Error('Unknown image with name ' + name);
    return images[name as ImgName];
}
