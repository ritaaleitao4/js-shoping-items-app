import './index.scss';
import ProductCard from '../product-card';
import mainPage from '../../index';

export default class ProductList {
    constructor(items, selectedItems) {
        this.items = items;
        this.itemsToShow = items;
        this.selectedItems = selectedItems;
    }

    renderCards() {
        //render cards component if there is cards to show
        if(this.itemsToShow.length) {
            return `
                <ul class="product-list__items">
                    ${this.itemsToShow.map((item, index) => new ProductCard(item, this.selectedItems, index).render()).join('')}
                </ul>
            `;
        } else {
            return '<div class="product-list__items empty">No cars with that name were found :(</div>';
        }
    }
  
    render() {
        //render all component: title + search + cards
        return `
            <section class="product-list">
                <div class="container">
                    <div class="product-list__header">
                        <h1>Cars in Stock</h1>
                        <input id="search-box" type="text" placeholder="Type to Filter...">
                    </div>
                    ${this.renderCards()}
                </div>
            </section>
        `;
    }

    onSearch() {
        document.getElementById('search-box').addEventListener('keyup', event => {
            const value = event.target.value.toLowerCase();
            
            //Display results if user types a string longer than 2 characters
            if(event.target.value.length > 2) {
                //Filter array of products by typed value
                let filter = this.items.filter( item => {
                    const name = item.modelClass + item.version;
                    return name.toLowerCase().includes(value.toLowerCase());
                })
                
                //match itemsToShow to filter result
                this.itemsToShow = filter;

            } else {
                //reset itemsToShow to original value
                this.itemsToShow = this.items;
            }

            //Rerender product list component 
            document.getElementsByClassName('product-list__items')[0].outerHTML = this.renderCards();

            //Add listner do add/remove from bag
            new mainPage().setEventToBagItems(this.itemsToShow, this.selectedItems);
        });
    }
};