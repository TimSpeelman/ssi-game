export interface Creator<P> {
    (i: P): IAction<P>;
    _type: string;
    _undoable?: boolean;
    _test: (e: IAction<any>) => e is IAction<P>;
}

export function event<Payload>(type: string, undoable?: boolean): Creator<Payload> {
    const fn = (payload: Payload) => ({ type, payload, _undoable: undoable });
    fn._type = type;
    fn._undoable = undoable;
    fn._test = (e: IAction<any>) => e.type === type;
    return <Creator<Payload>>fn;
}

export interface IAction<P> {
    type: string;
    payload: P;
    _undoable?: boolean;
}

export function is<P>(creator: Creator<P>, event: any): event is IAction<P> {
    return creator._type === event.type;
}

export type Reducer<S, P> = (payload: P) => (state: S) => S;

export type ReducerMap<State, Evts> = {
    [K in keyof Evts]: Evts[K] extends Creator<infer Payload> ? Reducer<State, Payload> : never;
};

export function getReducer<S, E>(map: ReducerMap<S, E>) {
    return (e: IAction<any>) => (e.type in map ? map[e.type as keyof typeof map] : undefined);
}

/** Simply assert that the record keys match the creator's type */
export function checkActionCreatorsRecord(record: Record<string, Creator<any>>) {
    const errs = Object.entries(record).filter(([key, creator]) => key !== creator._type);
    if (errs.length > 0) {
        const keys = errs.map(([key]) => key).join(', ');
        throw new Error(`Invalid action creators record, keys ${keys} don't match the creator's type string.`);
    }
}
