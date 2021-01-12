import mutations from './mutations';

describe('Mutations', () => {
    let state;

    beforeEach(() => {
        state = {
            stats: {},
            filters: {
                figure: new Set()
            }
        };
    });

    describe('setStats', () => {
        it('sets stats data', () => {
            mutations.setStats(state, { a: 'b' });
            expect(state.stats).toMatchObject({ a: 'b' });
        });
    });

    describe('toggleFilter', () => {
        it('adds figures to filters', () => {
            mutations.toggleFilter(state, { filter: 'figure', value: 'pd' });
            expect(state.filters).toMatchObject({ figure: new Set(['pd']) });
            mutations.toggleFilter(state, { filter: 'figure', value: 'kl' });
            expect(state.filters).toMatchObject({
                figure: new Set(['pd', 'kl'])
            });
        });

        it ('removes figures from filters', () => {
            mutations.toggleFilter(state, { filter: 'figure', value: 'pd' });
            mutations.toggleFilter(state, { filter: 'figure', value: 'kl' });
            mutations.toggleFilter(state, { filter: 'figure', value: 'kl' });
            expect(state.filters).toMatchObject({ figure: new Set(['pd']) });
        });

        it ('toggles winner filter', () => {
            mutations.toggleFilter(state, { filter: 'winner', value: 'black' });
            expect(state.filters).toMatchObject({ winner: 'black' });
        });

        it ('resets winner filter for *', () => {
            mutations.toggleFilter(state, { filter: 'winner', value: '*' });
            expect(state.filters).toMatchObject({ winner: null });
        });
    });

    describe('resetFilter', () => {
        it ('resets figure filter', () => {
            mutations.resetFilter(state, { filter: 'figure' });
            expect(state.filters).toMatchObject({ figure: new Set() });
        });
    });
});
