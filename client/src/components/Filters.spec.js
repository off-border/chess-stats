import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { _store } from '../store/Store';
import Filters from './Filters';
import vueBem from '../mixins/vue-bem.vue';


let localVue = createLocalVue();
localVue.use(Vuex);
localVue.mixin(vueBem);


jest.mock('node-fetch');
require('node-fetch'); // Should be required for correck mocking in actions.js

describe('Filters.vue', () => {
    let wrapper, store, dispatchSpy;

    beforeEach(() => {
        store = new Vuex.Store(_store);
        dispatchSpy = jest.spyOn(store, 'dispatch');

        wrapper = mount(Filters, {
            localVue,
            store,
        });
    });

    afterEach(() => dispatchSpy.mockRestore());

    describe('Occupation time', () => {
        it('sets figure filter', async function() {
            wrapper.find('.FilterButton').trigger('click');
            expect(store.state.filters).toMatchObject({
                figure: new Set(['r'])
            });
        });

        it('clears figure filter when "all" clicked', async function() {
            wrapper.find('.Filters__filter-reset').trigger('click');
            expect(store.state.filters).toMatchObject({ figure: new Set() });
        });

        it('marks figure as selected', async function() {
            const figure = wrapper.find('.FilterButton');
            expect(figure.classes()).not.toContain(
                'FilterButton_active'
            );
            figure.trigger('click');
            await wrapper.vm.$nextTick();
            expect(figure.classes()).toContain(
                'FilterButton_active'
            );
        });
    });

    describe('Winner side', () => {
        it('sets winner filter', async function() {
            wrapper.find('.Filters__filter_winner .FilterButton').trigger('click');
            expect(store.state.filters).toMatchObject({
                winner: { side: 'black' }
            });
        });

        it('marks winner type as selected', async function() {
            const winner = wrapper.find('.Filters__filter_winner .FilterButton');
            expect(winner.classes()).not.toContain(
                'FilterButton_active'
            );
            winner.trigger('click');
            await wrapper.vm.$nextTick();
            expect(winner.classes()).toContain(
                'FilterButton_active'
            );
        });
    });

    describe('Normalize data', () => {
        it('turns on/off data normalization', async function() {
            wrapper.find('.Filters__filter_normalize .FilterToggle').trigger('click');
            expect(store.state.filters).toMatchObject({
                normalizeData: true
            });
        });
    });
});

