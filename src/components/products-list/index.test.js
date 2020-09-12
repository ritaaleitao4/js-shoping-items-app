import listHero from '../../mocks/listHero.json';
import ProductList from '.';

describe('product list component', () => {
    it('it renders correctly', () => {
        expect(new ProductList(listHero, []).render()).toMatchSnapshot();
    });
});