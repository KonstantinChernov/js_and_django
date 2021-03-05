// Tabs

function tabs(tabsSelector, tabButtonsSelector) {
    const tabButtons = document.querySelectorAll(tabButtonsSelector);
    const tabs = document.querySelectorAll(tabsSelector);

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
}

export default tabs;