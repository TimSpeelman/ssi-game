import { ActorShape } from './ActorShape';
import { AssetShape } from './AssetShape';
import { ConnectionShape } from './ConnectionShape';
import { PseudonymShape } from './PseudonymShape';
import { ShapeProps } from './ShapeProps';
import { SlotShape } from './SlotShape';

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
