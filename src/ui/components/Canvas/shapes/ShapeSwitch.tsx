import { ShapeProps } from './ShapeProps';
import { ActorShape } from './shapes/ActorShape';
import { AssetShape } from './shapes/AssetShape';
import { ConnectionShape } from './shapes/ConnectionShape';
import { PseudonymShape } from './shapes/PseudonymShape';
import { SlotShape } from './shapes/SlotShape';

export function ShapeSwitch(props: ShapeProps<any>) {
    const e = props.elem;
    switch (e.type) {
        case 'slot':
            return SlotShape(props);
        case 'actor':
            return ActorShape(props);
        case 'connection':
            return ConnectionShape(props);
        case 'asset':
            return AssetShape(props);
        case 'pseudonym':
            return PseudonymShape(props);
        default:
            // @ts-ignore
            throw new Error('Unrecognized type ' + e.type);
    }
}
