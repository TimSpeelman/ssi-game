import React from 'react';

export interface Props {
    onSelectFiles: (files: FileList) => void;
}

export function HiddenFileInput(props: Props) {
    return (
        <input
            type="file"
            hidden
            value={undefined}
            onChange={(e) => e.target.files !== null && props.onSelectFiles(e.target.files)}
        />
    );
}
