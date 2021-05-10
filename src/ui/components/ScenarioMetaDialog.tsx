import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { ScenarioMeta } from '../../model/game/Scenario';

export interface Props {
    meta: ScenarioMeta;
    open: boolean;
    handleClose: () => void;
}

export function ScenarioMetaDialog(props: Props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>{props.meta.title}</DialogTitle>
            <DialogContent>
                <small>Auteur: {props.meta.author}</small>
            </DialogContent>
            <DialogContent>
                <DialogContentText>{props.meta.body}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Sluiten
                </Button>
            </DialogActions>
        </Dialog>
    );
}
