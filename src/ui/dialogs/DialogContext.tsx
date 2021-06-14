import React, { createContext, useState } from 'react';

export interface IDialogContext {
    open: (dialogName: string, props: any) => Promise<any>;
    options: Options | null;
    handleClose: () => void;
    handleSubmit: () => void;
}

export const DialogContext = createContext<IDialogContext>({} as IDialogContext);

export const DialogContextProvider: React.FC = ({ children }) => {
    const [options, setOptions] = useState<Options | null>(null);

    const awaitingPromiseRef = React.useRef<{
        resolve: () => void;
        reject: () => void;
    }>();

    const openDialog = (dialogName: string, props: any) => {
        setOptions({ dialogName, props });
        return new Promise<void>((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    const handleClose = () => {
        // Mostly always you don't need to handle canceling of alert dialog
        // So shutting up the unhandledPromiseRejection errors
        // if (options.catchOnCancel && awaitingPromiseRef.current) {
        //     awaitingPromiseRef.current.reject();
        // }

        setOptions(null);
    };

    const handleSubmit = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
        }

        setOptions(null);
    };

    const context = {
        open: openDialog,
        options,
        handleClose,
        handleSubmit,
    };

    return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>;
};

export const useDialogService = () => React.useContext(DialogContext);

export interface Options {
    dialogName: string;
    props: any;
}
