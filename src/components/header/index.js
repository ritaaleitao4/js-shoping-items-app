import './index.scss';
import logo from '../../assets/logo.svg';
import bag from '../../assets/shoppingBag.png';

export default class Header {
    constructor(bagItems) {
        //if there is items on bag, sum new value to old value (both numbers)
        this.total = bagItems ? bagItems.reduce((total, item) => total + parseFloat(item.price.amount), 0) : 0;
        //Format number to currency
        this.formatNumber = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.total);
    }

    render() {
        return `
            <header class="main-header">
                <section>
                    <img class="main-header__logo" src="${logo}" alt="logo-img"/>
                    <aside class="main-header__bag">
                        <p>${this.formatNumber}</p>
                        <img src="${bag}" alt="bag-icon"/>
                    </aside>
                </section>
            </header>
        `;
    }   
};