import { Button, Typography } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ScenarioMeta } from '../../../../model/definition/Scenario/ScenarioMeta';
import { useDialog } from '../../../dialogs/dialogs';
import { useLang } from '../../../hooks/useLang';

interface Props {
    meta: ScenarioMeta;
}

/** Shows the details of a scenario */
export function ScenarioInspector({ meta }: Props) {
    const { dict } = useLang();
    const { openDialog } = useDialog();
    return (
        <div style={{ padding: '1rem' }}>
            <Typography variant="h6">{meta.title}</Typography>
            <p>
                {dict.author}: {meta.author}
            </p>
            <ReactMarkdown>{meta.body}</ReactMarkdown>
            <Button onClick={() => openDialog('EditMeta', undefined)}>{dict.misc.btnEdit}</Button>
        </div>
    );
}
