import { mapValues } from '../../util/util';
import { Dictionary } from '../Dict';
import { Language, Translation } from '../Language';
import { DictionaryEN } from './EN';
import { DictionaryNL } from './NL';

/** Record by 'language' => 'string' => translation (example: dictionaries.NL.issuer = 'Uitgever') */
export const dictionaries: Record<Language, Dictionary> = {
    EN: DictionaryEN,
    NL: DictionaryNL,
};

/** Record by 'string' => 'language' => translation (example: translations.issuer.NL = 'Uitgever') */
export const translations = Object.keys(DictionaryEN).reduce(
    (all, str) => ({
        ...all,
        [str]: getTranslation(str as keyof Dictionary),
    }),
    {},
);

export function translate(lang: Language, str: keyof Dictionary): string {
    return dictionaries[lang][str];
}

export function getTranslation(str: keyof Dictionary): Translation {
    // @ts-ignore
    return mapValues<Dictionary, Language>(dictionaries, (dict) => dict[str]);
}
