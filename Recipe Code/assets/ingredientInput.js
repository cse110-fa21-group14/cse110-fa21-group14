class IngredientInput extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});
    }
    set data(data) {
        let shadow = this.shadowRoot;
        // creating elements for recipe card
        const input = document.createElement('div');
        let ingredientName = document.createElement('input');
        let ingredientAmount = document.createElement('input');
        let ingredientUnit = document.createElement('input');

        // setting 
    }
}