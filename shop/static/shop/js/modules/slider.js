// Slider
import { getZero } from './timer'


function slider({container, slide, nextBtn, prevBtn, totalCounter, currentCounter, wrapper, slidesInner}) {

        const slider = document.querySelector(container);
        const slides = document.querySelectorAll(slide);
    
        const sliderWindow = document.querySelector(wrapper);
        const slidesRow = document.querySelector(slidesInner);
                                                                                                              
        const slideWidth = window.getComputedStyle(sliderWindow).width;
    
        const prevSlideButton = document.querySelector(prevBtn);
        const nextSlideButton = document.querySelector(nextBtn);
        const currentSlide = document.querySelector(currentCounter);
        const totalSlides = document.querySelector(totalCounter);
    
        slider.style.position = "relative";
        const dots = document.createElement('ul');
        dots.style.cssText = `
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 15;
                        display: flex;
                        justify-content: center;
                        margin-right: 15%;
                        margin-left: 15%;
                        list-style: none;
        `;
        slider.append(dots);
        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.style.cssText = `
                        box-sizing: content-box;
                        flex: 0 1 auto;
                        width: 30px;
                        height: 6px;
                        margin-right: 3px;
                        margin-left: 3px;
                        cursor: pointer;
                        background-color: #fff;
                        background-clip: padding-box;
                        border-top: 10px solid transparent;
                        border-bottom: 10px solid transparent;
                        opacity: .5;
                        transition: opacity .6s ease;
            `;
            dot.setAttribute('data-slide-number', i + 1);
            dots.append(dot);
        }
    
        slides.forEach(slide => slide.style.width = slideWidth);
        slidesRow.style.width = 100 * slides.length + "%";
        slidesRow.style.display = "flex";
        slidesRow.style.transition = "0.5s";
    
        sliderWindow.style.overflow = "hidden";
        
        const createdDots = document.querySelectorAll('[data-slide-number]');
    
        createdDots.forEach(item => item.addEventListener('click', () => highlightDotAndShowSlide(parseInt(item.getAttribute('data-slide-number')))));
    
        prevSlideButton.addEventListener('click', () => {
            showSlide(numberOfSlide -= 1);
            highlightDot(numberOfSlide);
        });
        nextSlideButton.addEventListener('click', () => {
            showSlide(numberOfSlide += 1);
            highlightDot(numberOfSlide);
        });
    
    
        function highlightDot(id) {
            createdDots.forEach(item => item.style.opacity = '0.5');
            createdDots[id - 1].style.opacity = '1';
        }
    
        function showSlide(num) {
            if (num < 1) {
                num = slides.length;
                numberOfSlide = slides.length;
            } else if (num > slides.length) {
                num = 1;
                numberOfSlide = 1;
            }
            currentSlide.innerText = getZero(num); 
            slidesRow.style.transform = `translate(${-parseInt(slideWidth) * (num-1)}px, 0px)`;
        }
    
        function highlightDotAndShowSlide(num) {
            showSlide(num);
            highlightDot(num);
        }
    
        let numberOfSlide = 1;
        totalSlides.innerText = getZero(slides.length); 
        highlightDotAndShowSlide(numberOfSlide);
}

export default slider;
