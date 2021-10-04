import { render } from "@testing-library/react";
import Profile from "../Profile";

describe('Profile test', () => {

    it('matches snapshot', () => {
        const component = render(<Profile />);

        expect(component).toMatchSnapshot();
    });
});