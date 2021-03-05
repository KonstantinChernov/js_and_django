// Modal

function modal(callModalButtonsSelector, modalSelector, modalContentSelector, modalCloseSelector) {
        const modalButtons = document.querySelectorAll(callModalButtonsSelector);
        const modalWindow = document.querySelector(modalSelector);
    
        modalWindow.querySelector(modalContentSelector).style.cssText = 'overflow: hidden;';
        
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
            if (e.target == modalWindow || e.target.matches(modalCloseSelector)) closeWindow(modalWindow);
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
}

export default modal;