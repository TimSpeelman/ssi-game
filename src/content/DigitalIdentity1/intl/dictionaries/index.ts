import { Language, Translation } from '../../../../intl/Language';
import { mapValues } from '../../../../util/util';
import { Dictionary } from '../Dict';
import { DictionaryEN } from './EN';
import { DictionaryNL } from './NL';

/** Record by 'language' => 'string' => translation (example: dictionaries.NL.issuer = 'Uitgever') */
export const dictionaries: Record<Language, Dictionary> = {
    EN: DictionaryEN,
    NL: DictionaryNL,
};

/**
 * Content Specific Dictionary
 * Record by 'string' => 'language' => translation (example: translations.issuer.NL = 'Uitgever')
 */
export const translations = Object.keys(DictionaryEN).reduce(
    (all, str) => ({
        ...all,
        [str]: getTranslation(str as keyof Dictionary),
    }),
    {} as Record<keyof Dictionary, Record<Language, string>>,
);

export function getTranslation(str: keyof Dictionary): Translation {
    // @ts-ignore
    return mapValues<Dictionary, Language>(dictionaries, (dict) => dict[str]);
}
