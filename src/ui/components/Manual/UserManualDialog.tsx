import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { manuals } from '../../../docs/UserManual';
import { useLang } from '../../hooks/useLang';

export interface Props {
    open: boolean;
    handleClose: () => void;
}

export function UserManualDialog(props: Props) {
    const { dict, lang } = useLang();
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth={'lg'}
            scroll="paper"
        >
            <DialogTitle>{dict.userManual}</DialogTitle>
            <DialogContent dividers style={{ maxWidth: '50em' }}>
                <ReactMarkdown>{manuals[lang]}</ReactMarkdown>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {dict.btnClose}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
