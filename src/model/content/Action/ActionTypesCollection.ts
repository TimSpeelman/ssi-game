import { keyByFn } from '../../../util/util';
import { ActionDef } from '../../definition/Action/ActionDef';
import { Action } from '../../logic/Step/Action';
import { ActionType } from './ActionType';

export class ActionTypesCollection {
    readonly typesRecord: Record<string, ActionType<any>>;

    constructor(readonly types: ActionType<any>[]) {
        this.typesRecord = keyByFn(types, (t) => t.schema.typeName);
    }

    requireTypeByName(typeName: string): ActionType<any> {
        if (typeName in this.typesRecord) {
            return this.typesRecord[typeName];
        } else {
            throw new Error(`Action with type name '${typeName}' unknown`);
        }
    }

    deserialize(s: ActionDef<any>): Action<any> {
        const type = this.requireTypeByName(s.typeName);
        return type.factory(s.id, s.props);
    }

    listTypeNames(): string[] {
        return this.types.map((t) => t.schema.typeName);
    }
}
