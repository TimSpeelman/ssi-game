import { omit, reorder } from '../util';

export interface HasId {
    id: string;
}

export interface OrderedMap<T extends HasId> {
    byId: Record<string, T>;
    ids: string[];
}

const fromList = <T extends HasId>(items: T[]): OrderedMap<T> => ({
    ids: items.map((i) => i.id),
    byId: items.reduce((byId, item) => ({ ...byId, [item.id]: item }), {}),
});

const update = <T extends HasId>(item: T) => (map: OrderedMap<T>): OrderedMap<T> => {
    assertContains(map, item.id);
    return {
        ids: map.ids,
        byId: { ...map.byId, [item.id]: item },
    };
};

const push = <T extends HasId>(item: T) => (map: OrderedMap<T>): OrderedMap<T> => ({
    ids: [...map.ids, item.id],
    byId: { ...map.byId, [item.id]: item },
});

const dropById = <T extends HasId>(id: string) => (map: OrderedMap<T>): OrderedMap<T> => ({
    ids: map.ids.filter((i) => i !== id),
    byId: omit(id)(map.byId),
});

const reorderOM = <T extends HasId>(fromIndex: number, toIndex: number) => (map: OrderedMap<T>): OrderedMap<T> =>
    fromIndex === toIndex
        ? map
        : {
              ids: reorder(map.ids, fromIndex, toIndex),
              byId: map.byId,
          };

const list = <T extends HasId>(map: OrderedMap<T>): T[] => map.ids.map((id) => map.byId[id]);

function assertContains(map: OrderedMap<any>, id: string) {
    if (!(id in map.byId)) throw new Error('Expected ordered map to contain id ' + id);
}

const empty: OrderedMap<any> = { byId: {}, ids: [] };

export const orderedMap = {
    empty,
    fromList,
    push,
    update,
    dropById,
    reorder: reorderOM,
    list,
};
