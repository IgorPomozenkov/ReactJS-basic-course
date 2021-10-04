import { setChats } from "../actions";
import { chatsReducer } from "../reducer";

describe('reducer test', () => {

    it('returns state after setChats action', () => {
        const initialState = {
            chatsList: [],
        }
        const expected = {
            chatsList: [{id: 1, name: 'chat1',}],
        }
        const received = chatsReducer(initialState, setChats([{id: 1, name: 'chat1',}]));
        expect(expected).toEqual(received);
    });
});