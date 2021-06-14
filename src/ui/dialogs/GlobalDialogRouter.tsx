import { Dialog } from '@material-ui/core';
import React from 'react';
import { useDialogService } from './DialogContext';
import { GlobalDialogs } from './dialogs';

export function GlobalDialogRouter() {
    const { options, handleClose, handleSubmit } = useDialogService();
    if (options && !(options.dialogName in GlobalDialogs)) {
        throw new Error('Unknown dialog with name ' + options.dialogName);
    }
    const DialogBody = options ? GlobalDialogs[options.dialogName as keyof typeof GlobalDialogs] : () => <div></div>;

    return (
        <Dialog open={!!options} onClose={handleClose}>
            {options && <DialogBody onCancel={handleClose} onSubmit={handleSubmit} options={options.props} />}
        </Dialog>
    );
}
