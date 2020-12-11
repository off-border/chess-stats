import { shallowMount, mount } from '@vue/test-utils';
import ChessBoard from './ChessBoard';

describe('ChessBoard', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(ChessBoard, {
            propsData: {
                stats: {
                    percentageByPiece: {
                        a8: { s: 40 },
                        d5: { s: 30 },
                        f5: { s: 30 },
                    }
                }
            }
        });
    });

    // it ('renders with empty stats', () => {
    //     wrapper = shallowMount(ChessBoard);
    // });

    it('renders occupation tiles', async function() {
        expect(wrapper.findAll('.StatsTile').length).toBe(3);
    });
});