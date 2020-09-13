import './styles.scss';
import Header from './components/header';
import Footer from './components/footer';
import ProductsList from './components/products-list';
import Loading from './components/loading';
import SmallScreen from './components/small-screen';

const app = document.querySelector('main');
const media = window.matchMedia('(max-width: 1024px)') 

class mainPage {
    constructor() {
        this.axios = require('axios');
        this.selectedItems = [];
        this.products = [];
    }

    //Loading until mock is ready and return header and loading components
    waitingData() {
        return `
            ${Loading()}
            ${new Header().render()}
        `;
    }

    //Load data from mock and return components
    async loadData() {
        try {
            //Request data from mock json
            await this.axios.get('./mocks/listHero.json').then(async ({data}) => {
                this.products = data;

                //This call is too fast, so i set a delay to show loading component for more 500ms. In a normal call, this delay wasn't required
                await new Promise(resolve => setTimeout(resolve, 500));
            })
        } catch (e) {
            return '<div class="error">Error loading products items...</div>';
        }

        //Render header, product list and footer components
        return `
            ${new Header(this.selectedItems).render()}
            ${new ProductsList(this.products, this.selectedItems).render()}
            ${Footer()}
        `;
    }

    //Event listener to remove/add items to bag
    setEventToBagItems(itemsToShow, selectedItems) {
        const buttonCard = document.querySelectorAll('.add-to-bag');
        if (buttonCard) {
            buttonCard.forEach((item) => {
                //Add event listener for all products button
                item.addEventListener('click', async event => {
                    const targetId = event.target.id;

                    //Check if item is added to bag
                    if(selectedItems.some(bagItem => bagItem === itemsToShow[targetId])) {
                        //Checking index of element to remove from bag and remove it
                        const index = selectedItems.indexOf(itemsToShow[targetId]);
                        selectedItems.splice(index, 1);

                    } else {
                        //Add new product to bag
                        selectedItems.push(itemsToShow[targetId]);
                    }

                    //Add updated components to DOM
                    this.reRender(itemsToShow, selectedItems);
                });
            });
        }
    }
    
    //Rerender Components
    reRender(itemsToShow, selectedItems) {
        //Add updated components to DOM
        document.getElementsByClassName('main-header')[0].outerHTML = new Header(selectedItems).render();
        document.getElementsByClassName('product-list__items')[0].outerHTML = new ProductsList(itemsToShow, selectedItems).renderCards();
        this.setEventToBagItems(itemsToShow, selectedItems);
    }

    async init(){
        //Add components to DOM
        app.innerHTML = this.waitingData();

        //Wait until mock is ready and add components to DOM
        app.innerHTML = await this.loadData();

        //Add event listeners
        new ProductsList(this.products, this.selectedItems).onSearch()
        this.setEventToBagItems(this.products, this.selectedItems);
    }
}

const setView = () => {
    //Verify if media query matches - screen size is smaller than 1024px
    if (media.matches) {
        //Add component to DOM
        app.innerHTML = `${SmallScreen()}`;
    } else {
        //Call function to render components
        new mainPage().init();
    }
}

//Call function to init project
setView();

//Attach listener function on media changes
media.addEventListener('change', () => {
    setView();
});

export default mainPage;
