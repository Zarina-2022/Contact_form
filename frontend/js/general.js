const nameLabel = document.getElementById('nameLabel')
const nameInput = document.getElementById('name')

const surnameLabel = document.getElementById('surnameLabel')
const surnameInput = document.getElementById('surname')

const emailLabel = document.getElementById('emailLabel')
const emailInput = document.getElementById('email')

const messageLabel = document.getElementById('messageLabel')
const messageArea = document.getElementById('message')

const contactForm = document.getElementById('contactForm')

const emailError = document.getElementById('emailError')
const messageError = document.getElementById('messageError')

const responseContainer = document.getElementById('responseContainer')
const submitBtn = document.getElementById('submitBtn')
const responseText = document.getElementById('responseText')

const closeResponse = document.getElementById('closeResponse')

// INPUTS
// nameInput = focusin/focusout
nameInput.addEventListener('focusin', () => {
    nameLabel.style.color = '#000'
})
nameInput.addEventListener('focusout', () => {
    nameLabel.style.color = '#777'
})

// surnameInput = focusin/focusout
surnameInput.addEventListener('focusin', () => {
    surnameLabel.style.color = '#000'
})
surnameInput.addEventListener('focusout', () => {
    surnameLabel.style.color = '#777'
})

// emailInput = focusin/focusout
emailInput.addEventListener('focusin', () => {
    emailLabel.style.color = '#000'
})
emailInput.addEventListener('focusout', () => {
    emailLabel.style.color = '#777'
    emailError.innerText = ''
})

// messageArea = focusin/focusout
messageArea.addEventListener('focusin', () => {
    messageLabel.style.color = '#000'
})
messageArea.addEventListener('focusout', () => {
    messageLabel.style.color = '#777'
    messageError.innerText = ''
})

// CONTACT FORM CONTAINER

// preventDefault ile submit(event parametresini) olayini (baska sayfaya gitmesini) engelliyoruz
contactForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (emailInput.value === '') {
        emailError.innerText = '* Email field cannot be empty'
        emailInput.focus()
        return
    }
    if (messageArea.value === '') {
        messageError.innerText = '* Message field cannot be empty'
        messageArea.focus()
        return
    }
    // Requesti gonderme kismi:
    const newForm = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
        message: messageArea.value,
        date: new Date()
    }
    // Submit btn'e tiklayinca btn disable olacak cevap gelene kadar:
    submitBtn.disabled = true
    submitBtn.classList.replace('submitBtnActive', 'submitBtnDisabled')
    submitBtn.innerHTML = 'Being sent...'
    // istegi attigim yer burasi
    fetch("http://localhost:3004/add-form", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newForm)
    })
        // cevebi aldigim yer burasi:
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status === 200) {
                responseContainer.style.display = 'block'
                responseContainer.classList.add('responseSuccess')
                responseText.innerText = 'Your form has been successfully submitted.'

                /*
                // setTimeout ile ekrandaki tum bilgileri temizlemek:
                setTimeout(() => {
                    responseContainer.style.display = 'none'
                    responseContainer.classList.remove('responseSuccess')
                    responseText.innerText = ''
                    submitBtn.disabled = false
                    submitBtn.classList.replace('submitBtnDisabled', 'submitBtnActive')
                    submitBtn.innerHTML = 'Send'
                    nameInput.value = ''
                    surnameInput.value = ''
                    emailInput.value = ''
                    messageArea.value = ''
                }, 3000);
                */
            }
        })
        .catch(err => {
            console.log(err)
            responseContainer.style.display = 'block'
            responseContainer.classList.add('responseFail')
            responseText.innerText = 'An error occurred while submitting your form.'
            /*
            // setTimeout ile ekrandaki tum bilgileri temizlemek:
            setTimeout(() => {
                responseContainer.style.display = 'none'
                responseContainer.classList.remove('responseSuccess')
                responseText.innerText = ''
                submitBtn.disabled = false
                submitBtn.classList.replace('submitBtnDisabled', 'submitBtnActive')
                submitBtn.innerHTML = 'Send'
            }, 3000);
            */
        })
})
    // Carpi iconuna tiklayarak ekrandaki bilgileri temizleme:
 closeResponse.addEventListener("click", () => {
    responseContainer.style.display = 'none'
    responseContainer.classList.remove('responseSuccess')
    responseText.innerText = ''
    submitBtn.disabled = false
    submitBtn.classList.replace('submitBtnDisabled', 'submitBtnActive')
    submitBtn.innerHTML = 'Send'
    nameInput.value = ''
    surnameInput.value = ''
    emailInput.value = ''
    messageArea.value = ''
 });


// google = fetch post example yaz ornekler var orda 




