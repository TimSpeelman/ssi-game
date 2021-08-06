import { Button, Menu, MenuItem } from '@material-ui/core';
import { LanguageRounded } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useLang } from '../../hooks/useLang';

export function LanguageMenu() {
    const { lang, languages, setLang } = useLang();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setLanguage = (language: any) => {
        setLang(language);
        handleClose();
    };

    return (
        <Fragment>
            <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'white' }}>
                <LanguageRounded /> {lang}
            </Button>
            <Menu id="language-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {languages.map((v) => (
                    <MenuItem key={v} onClick={() => setLanguage(v)}>
                        {v}
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}
