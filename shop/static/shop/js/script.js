'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tabs


    const tabButtons = document.querySelectorAll('.tabheader__item');
    const tabs = document.querySelectorAll('.tabcontent');


    function showOneTab(tabs, tabButtons, numberOfTab = 0) {
        for (let i = 0; i < tabButtons.length; i++) {
            if (i !== numberOfTab) {
                tabs[i].classList.add('hide');
                tabButtons[i].classList.remove('tabheader__item_active');
            } else {
                tabs[i].classList.remove('hide');
                tabButtons[i].classList.add('tabheader__item_active');
            }
        }
    }

    tabButtons.forEach((elem, index) => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            showOneTab(tabs, tabButtons, index);
        });
    });

    showOneTab(tabs, tabButtons);


    // Timer

    const deadline = '2021-02-04 16:45:00';


    function getTimeRemaining(endtime) {
        let time = new Date(endtime) - new Date();
        const days = Math.floor(time / (24 * 60 * 60 * 1000)),
              hours = Math.floor((time / (60 * 60 * 1000)) % 24),
              minutes = Math.floor((time / (60 * 1000)) % 60),
              seconds = Math.floor((time / 1000) % 60);

        return {
            time: time,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function getZero(num) {
        return (num < 10 && num >= 0) ? `0${num}`: num;
    }

    function updateTimer(timer) {
        const days = document.querySelector("#days"),
              hours = document.querySelector("#hours"),
              minutes = document.querySelector("#minutes"),
              seconds = document.querySelector("#seconds");

        days.innerHTML = getZero(timer.days);
        hours.innerHTML = getZero(timer.hours);
        minutes.innerHTML = getZero(timer.minutes);
        seconds.innerHTML = getZero(timer.seconds);       

        if (timer.time <= 1000) {
            clearTimeout(timerStart);
            
            days.innerHTML = getZero(0);
            hours.innerHTML = getZero(0);
            minutes.innerHTML = getZero(0);
            seconds.innerHTML = getZero(0);
        }
    }

    let timerStart = setTimeout(function start() {
        updateTimer(getTimeRemaining(deadline));
        setTimeout(start, 1000);
    }, 1000);

    updateTimer(getTimeRemaining(deadline));


    // Modal

    const modalButtons = document.querySelectorAll("[data-modal]");
    const modalWindow = document.querySelector(".modal");

    modalWindow.querySelector(".modal__content").style.cssText = 'overflow: hidden;';
    
    function closeWindow(win) {
        win.style.cssText = 'display: None;';
        document.body.style.cssText = 'overflow: auto;'
    } 

    function openWindow(win) {
        win.style.cssText = 'display: block;';
        document.body.style.cssText = 'overflow: hidden;'
    } 


    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target && e.target.tagName=="BUTTON") openWindow(modalWindow);
            clearInterval(modalTimer);
        });
    });

    modalWindow.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target == modalWindow || e.target.matches('.modal__close')) closeWindow(modalWindow);
    });

    document.addEventListener('keydown', (e)=>{
        if (e.code === "Escape" && modalWindow.style.display !== "None") closeWindow(modalWindow); 
    });

    const modalTimer = setTimeout(openWindow, 2000, modalWindow);


    function showModalByScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
        openWindow(modalWindow);
        window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Menu Cards


    const menuContainer = document.querySelector('.menu .container')

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
                div.classList.add('menu__item');
            } else {
                this.classes.forEach(className => div.classList.add(className));
            };
            
            div.innerHTML = `<div class="menu__item">
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

    fetch('', {
        method: "GET", 
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        }
    })
    .then(data => data.json())
    .then((data) => {
        for (let card of data.cards) {
            new MenuItem(
                card.img, 
                card.alt,
                card.title,
                card.description,
                card.price, 
                ).render(menuContainer);
        };
    })

    // Forms AJAX

    const forms = document.querySelectorAll('form');
    forms.forEach(form => sendForm(form));


    const alerts = {
        loading: "/static/shop/icons/spinner.svg",
        error: "something went wrong",
        success: "data sent successfully"
    }


    function showMessageModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalWindow.style.cssText = "display: block;";
        modalDialog.style.cssText = "display: None;";

        
        const messageModal = document.createElement('div');
        messageModal.classList.add('modal__dialog');
        messageModal.innerHTML = `<div class="modal__content">
                                        <form action="#" method="POST">
                                            <div data-modal_close class="modal__close">&times;</div>
                                            <div class="modal__title">${message}</div>
                                        </form>
                                 </div>`
        modalWindow.append(messageModal);
        setTimeout(() => {
            modalDialog.style.cssText = "display: block;";
            modalWindow.style.cssText = "display: None;";
            messageModal.remove();
        }, 4000);
    }


    function sendForm(form) {
        form.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();

            const loadingMessage = document.createElement('img');
            loadingMessage.src = alerts.loading;
            loadingMessage.style.cssText = "display: block; margin: 0 auto;";

            form.insertAdjacentElement('afterend', loadingMessage);
            

            const formData = new FormData(form);

            fetch('', {
                method: "POST", 
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",

                }
            })
            .then(data => data.text())
            .then((data) => {
                console.log(data);
                showMessageModal(alerts.success);
            }).catch(() => {
                showMessageModal(alerts.error);
            }).finally(() => {
                loadingMessage.remove();
                form.reset()
            })


            // const xhr = new XMLHttpRequest();
            // xhr.open('POST', '');
            // xhr.setRequestHeader("X-CSRFToken", form.querySelector("input[name='csrfmiddlewaretoken']").value); 
            // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
            // xhr.send(formData);
            // xhr.addEventListener('load', () => {
            //     if (xhr.status === 200) {
            //         console.log(xhr.response);
            //         showMessageModal(alerts.success);
            //         loadingMessage.remove();
            //         form.reset();
                    
            //     } else {
            //         showMessageModal(alerts.error);
            //         loadingMessage.remove();
            //     }
            // })    

        });
    }

});