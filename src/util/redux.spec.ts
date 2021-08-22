import { event, is } from './redux';

describe('redux event and is', function () {
    test('`is` tests for the right action type', function () {
        const creatorA = event<{ someKey: string }>('MY_TYPE_A', true);
        const creatorB = event<{ someKey: string }>('MY_TYPE_B', true);
        const createdEventA = creatorA({ someKey: 'abc' });
        const createdEventB = creatorB({ someKey: 'abc' });
        expect(is(creatorA, createdEventA)).toBe(true);
        expect(is(creatorB, createdEventB)).toBe(true);
        expect(is(creatorA, createdEventB)).toBe(false);
        expect(is(creatorB, createdEventA)).toBe(false);
    });
});
