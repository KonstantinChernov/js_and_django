// Forms AJAX
import { postData } from '../services/services'

function forms(formSelector, modalSelector, modalDialogSelector) {
        const modalWindow = document.querySelector(modalSelector);
        const forms = document.querySelectorAll(formSelector);
        forms.forEach(form => sendForm(form));
  
    
        const alerts = {
            loading: "/static/shop/icons/spinner.svg",
            error: "something went wrong",
            success: "data sent successfully"
        }
    
    
        function showMessageModal(message) {
            const modalDialog = document.querySelector(modalDialogSelector);
    
            modalWindow.style.cssText = "display: block;";
            modalDialog.style.cssText = "display: None;";
    
            
            const messageModal = document.createElement('div');
            messageModal.classList.add(`${modalDialogSelector.slice(1)}`);
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
                // const jsonData = JSON.stringify(Object.fromEntries((Object.entries(formData))));
                console.log(formData);
    
                postData('', formData)
                .then((data) => {
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
}

export default forms;