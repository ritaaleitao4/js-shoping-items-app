import Header from '.';

const mockItem = [{
    modelClass: "A",
    version: "200",
    price: {
        amount: "29500.00",
        currency: "EUR",
        locale: "de-DE"
    },
    imagePath: "/assets/carImages/aclasswhite.jpg"
}, {
    modelClass: "B",
    version: "300",
    price: {
        amount: "9500.00",
        currency: "EUR",
        locale: "de-DE"
    },
    imagePath: "/assets/carImages/aclasswhite.jpg"
}];

describe('header component', () => {
    it('it renders correctly', () => {
        expect(new Header(mockItem).render()).toMatchSnapshot();
    });
});