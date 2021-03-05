// Menu Cards
import { getData } from '../services/services'

function cards(menuContainerSelector, menuItemSelector) {
        const menuContainer = document.querySelector(menuContainerSelector)

        class MenuItem {
            constructor(img, alt, title, description, price, ...classes) {
                this.img = img;
                this.alt = alt;
                this.title = title;
                this.description = description;
                this.price = price;
                this.classes = classes
            }
    
            render(parentElement) {
                const div = document.createElement('div');
                if (this.classes.length === 0) {
                    div.classList.add(menuItemSelector);
                } else {
                    this.classes.forEach(className => div.classList.add(className));
                };
                
                div.innerHTML = `<div class="${menuItemSelector}">
                                    <img src="${this.img}" alt="${this.alt}">
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                    <div class="menu__item-descr">${this.description}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>
                                </div>`
                parentElement.append(div);
            }
        }
    

    
        getData('')
        .then(
            data => {
                data.cards.forEach(({img, alt, title, description, price}) =>
                    new MenuItem(img, alt, title, description, price).render(menuContainer)
                )}
        );
}

export default cards;