import './index.scss';

export default class ProductCard {
    constructor(item, selectedItems, index) {
        this.item = item;
        this.selectedItems = selectedItems;
        this.index = index;
    }

    render() {
        return`
            <li class="product-card ${this.selectedItems.some(bagItem => bagItem === this.item) ? 'added' : ''}" >
                <h2>${this.item.modelClass}${this.item.version}</h2>
                <div class="product-card__content">
                    <div class="product-card__content__image">
                        <img src="${this.item.imagePath}" alt="${this.item.modelClass} ${this.item.version}"/>
                    </div>
                    <div class="product-card__content__info">
                        <p>${new Intl.NumberFormat(this.item.price.locale, { style: 'currency', currency: this.item.price.currency }).format(this.item.price.amount)}</p>
                    </div>
                    <button class="add-to-bag" id="${this.index}">
                        ${this.selectedItems.some(bagItem => bagItem === this.item) ? 'Remove from Shopping Bag' : 'Add to Shopping Bag'}
                    </button>
                </div>  
            </li>
        `;
    }
};