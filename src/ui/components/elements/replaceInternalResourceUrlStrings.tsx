import React, { ReactNode } from 'react';
import { InternalResourceUrl } from './InternalResourceUrl';

export function replaceInternalResourceUrlStrings(str: string, index = 0): ReactNode[] {
    const regex = /\[([^\]]*)\]\(([^\)]*)\)/;
    const matches = str.match(regex);
    if (matches) {
        const [full, url, text] = matches;
        const index = str.indexOf(full);
        const len = full.length;
        const pre = str.substr(0, index);
        const post = str.substr(index + len);
        const link = (
            <InternalResourceUrl url={url} key={index}>
                {text}
            </InternalResourceUrl>
        );
        return [pre, link, ...replaceInternalResourceUrlStrings(post, index + 1)];
    } else {
        return [str];
    }
}
