import gov1 from '../ui/assets/img/gov1.png';
import office1 from '../ui/assets/img/office1.png';
import office2 from '../ui/assets/img/office2.png';
import office3 from '../ui/assets/img/office3.png';
import person1 from '../ui/assets/img/person1.png';
import person2 from '../ui/assets/img/person2.png';
import person3 from '../ui/assets/img/person3.png';
import shop1 from '../ui/assets/img/shop1.png';

const images = {
    office1,
    office2,
    office3,
    person1,
    person2,
    person3,
    gov1,
    shop1,
};

export type ImgName = keyof typeof images;

export function actorImage(name: ImgName): string {
    return images[name];
}