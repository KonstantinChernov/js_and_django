// Calculator

function calculator(resultSelector) {
        const result = document.querySelector(resultSelector);

        let gender, height, weight, age, activity;
    
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            switch (key) {
                case 'gender':
                    gender = localStorage.getItem('gender');
                    break;
                case 'height':
                    height = localStorage.getItem('height');
                    document.querySelector('#height').value = height;
                    break;
                case 'weight':
                    weight = localStorage.getItem('weight');
                    document.querySelector('#weight').value = weight;
                    break;
                case 'age':
                    age = localStorage.getItem('age');
                    document.querySelector('#age').value = age;
                    break;
                case 'activity':
                    activity = localStorage.getItem('activity');
                    break;
            }
        }
    
        setDefaultClickParameter('gender');
        setDefaultClickParameter('activity');
    
    
        function setDefaultClickParameter(parameter) {
            const choices = document.querySelectorAll(`#${parameter} div`);
            if (localStorage.getItem(parameter)) {
                choices.forEach(item => {
                    if (item.getAttribute('data-info') == localStorage.getItem(parameter)) {
                        choices.forEach(item => item.classList.remove('calculating__choose-item_active'));
                        item.classList.add('calculating__choose-item_active');
                    }
                })
            }
        }
    
        function getCalories() {
            if (!gender || !height || !weight || !age || !activity) {
                result.textContent = '!!';
                return;
            }
    
            if (gender === 'male') {
                result.textContent = Math.round((9.99 * weight + 6.25 * height - 4.92 * age + 5) * activity);
            } else {
                result.textContent = Math.round((9.99 * weight + 6.25 * height - 4.92 * age - 161) * activity);
            }
        }
    
        function getClickParameter(parameter) {
            const choices = document.querySelectorAll(`#${parameter} div`);
            choices.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (parameter == 'gender') {
                       gender = e.target.getAttribute('data-info');
                    } else if (parameter == 'activity') {
                        activity = parseFloat(e.target.getAttribute('data-info'));
                    }
                    localStorage.setItem(parameter, e.target.getAttribute('data-info'));
                    choices.forEach(item => item.classList.remove('calculating__choose-item_active'));
                    item.classList.add('calculating__choose-item_active');
                    getCalories() 
                })
            })
    
        }
    
        function getInputParameter(parameter) {
            const inp = document.querySelector(`#${parameter}`);
            inp.addEventListener('input', () => {
                    if (inp.value.match(/\D/g)) {
                        inp.style.border = '1px solid red';
                    } else {
                        inp.style.border = '';
                    }
                    switch (parameter) {
                        case 'height':
                            height = +inp.value;
                            localStorage.setItem('height', height);
                            break;
                        case 'age':
                            age = +inp.value;
                            localStorage.setItem('age', age);
                            break;
                        case 'weight':
                            weight = +inp.value;
                            localStorage.setItem('weight', weight);
                            break;
    
                    }
                    
                    getCalories();
                });
        }
           
        getCalories();
        getClickParameter('gender');
        getClickParameter('activity');
        getInputParameter('height');
        getInputParameter('age');
        getInputParameter('weight');
}

export default calculator;