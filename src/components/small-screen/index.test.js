import SmallScreen from '.';

describe('footer component', () => {
    it('it renders correctly', () => {
        expect(SmallScreen()).toMatchSnapshot();
    });
});