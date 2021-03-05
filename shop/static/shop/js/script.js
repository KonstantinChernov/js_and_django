'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import slider from './modules/slider';
import cards from './modules/cards';
import modal from './modules/modal';
import forms from './modules/forms';
import calculator from './modules/calculator';
import timer from './modules/timer';



window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabcontent', '.tabheader__item');
    slider({
        container: '.offer__slider', 
        slide: ".offer__slide", 
        nextBtn: ".offer__slider-next", 
        prevBtn: ".offer__slider-prev", 
        totalCounter: "#total", 
        currentCounter: "#current", 
        wrapper: '.offer__slider-wrapper',
        slidesInner: '.offer__slider-inner', 
    });
    cards('.menu .container','menu__item');
    modal("[data-modal]", ".modal", ".modal__content", '.modal__close');
    forms('form', ".modal", '.modal__dialog');
    calculator(".calculating__result span");
    timer('2021-05-14');
});