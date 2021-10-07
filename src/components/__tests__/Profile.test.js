import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Profile from "../Profile";

describe('Profile test', () => {
    const middlewares = []
    const mockStore = configureStore(middlewares);
    const initialState = {}
    const store = mockStore(initialState);

    it('matches snapshot', () => {
        const component = render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );
        
        expect(component).toMatchSnapshot();
    });

    it('test button click', () => {
        const component = render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );
       
        const clickBut = component.getByTestId("button-test");
        fireEvent(clickBut, new MouseEvent('click'));
    });
});