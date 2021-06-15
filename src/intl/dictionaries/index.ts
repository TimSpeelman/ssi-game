import { Dictionary } from '../Dict';
import { Language } from '../Language';
import { DictionaryEN } from './EN';
import { DictionaryNL } from './NL';

export const dictionaries: Record<Language, Dictionary> = {
    EN: DictionaryEN,
    NL: DictionaryNL,
};

export function translate(lang: Language, str: keyof Dictionary): string {
    return dictionaries[lang][str];
}
