export type Translation = Record<Language, string>;

export enum Language {
    NL = 'NL',
    EN = 'EN',
}

export const uniLang = (str: string): Translation => ({
    NL: str,
    EN: str,
});
