import ProductCard from '.';

const mockItem = {
    modelClass: "A",
    version: "200",
    price: {
        amount: "29500.00",
        currency: "EUR",
        locale: "de-DE"
    },
    imagePath: "/assets/carImages/aclasswhite.jpg"
};

describe('product card component', () => {
    it('it renders correctly', () => {
        expect(new ProductCard(mockItem, [], 0).render()).toMatchSnapshot();
    });
});