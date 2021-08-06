import { useDispatch, useSelector } from 'react-redux';
import { Dictionary } from '../../intl/Dict';
import { dictionaries, translate } from '../../intl/dictionaries';
import { Language } from '../../intl/Language';
import { GameActions } from '../../state/actions';
import { selectLang } from '../../state/selectors';

export function useLang() {
    const lang = useSelector(selectLang);
    const dispatch = useDispatch();
    const setLang = (language: Language) => dispatch(GameActions.SET_LANGUAGE({ language }));

    return {
        lang,
        languages: Object.keys(Language),
        setLang,
        translate: (str: keyof Dictionary) => translate(lang, str),
        dict: dictionaries[lang],
    };
}
