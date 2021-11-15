class RecipeCard extends HTMLElement{
    constructor(){
        super();
        let shadow = this.attachShadow({mode: 'open'});
    }
    set data(data){
        styleElem.innerHTML = styles;
        const styleElem = document.createElement('style');
        const styles = ''
    }
}
customElements.define('recipe-card', RecipeCard);