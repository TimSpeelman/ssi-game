import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { HTMLProps } from 'react';
import { IntrinsicElements } from 'react-markdown/src/ast-to-react';
import { ImageOrIconDefinition } from '../../../model/common/ImageOrIconDefinition';

export interface Props extends HTMLProps<HTMLElement> {
    image: ImageOrIconDefinition;
    stylesPerType?: Partial<Record<ImageOrIconDefinition['type'], CSSProperties>>;
}

export function ImageOrIconSwitch({ image, stylesPerType, ...props }: Props) {
    const styles = stylesPerType || {};
    switch (image.type) {
        case 'image': {
            const castProps = props as IntrinsicElements['img'];
            return <img style={styles['image']} {...castProps} src={image.url} />;
        }
        case 'fa-icon': {
            const castProps = props as IntrinsicElements['i'];
            return <i style={styles['fa-icon']} {...castProps} className={'fas fa-' + image.name} />;
        }
    }
}
