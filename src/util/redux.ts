export interface Creator<P> {
    (i: P): IAction<P>;
    _type: string;
    _test: (e: IAction<any>) => e is IAction<P>;
}

export function event<Payload>(type: string): Creator<Payload> {
    const fn = (payload: Payload) => ({ type, payload });
    fn._type = type;
    fn._test = (e: IAction<any>) => e.type === type;
    return <Creator<Payload>>fn;
}

export interface IAction<P> {
    type: string;
    payload: P;
}

export function is<P>(creator: Creator<P>, event: any): event is IAction<P> {
    return creator._type === event.type;
}

export type Reducer<S, P> = (payload: P) => (state: S) => S;

export type ReducerMap<State, Evts> = {
    [K in keyof Evts]: Evts[K] extends Creator<infer Payload> ? Reducer<State, Payload> : never;
};
