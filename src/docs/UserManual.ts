import { Language } from '../intl/Language';
import manualEN from './USER_MANUAL_EN.md';
import manualNL from './USER_MANUAL_NL.md';

// NOTE: Images in the `static` folder are copied to the root of the build folder and can be referenced with a relative url, e.g. './image.jpg'

export const manuals: Record<Language, string> = {
    NL: manualNL,
    EN: manualEN,
};
