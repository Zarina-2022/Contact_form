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
    fetch("http://localhost:3004/add-form", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newForm)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
})

// google = fetch post example yaz ornekler var orda 
