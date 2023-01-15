const username = "emrehrmn"
const password = "onecvlandingapi"

const loginForm = document.getElementById("loginForm")
const yetkisiz = document.getElementById("yetkisiz")
const yetkili = document.getElementById("yetkili")

const usernameInput = document.getElementById("usernameInput")
const passwordInput = document.getElementById("passwordInput")
const loginError = document.getElementById("loginError")

const toTopBtn = document.getElementById("toTopBtn")

var isLogin = false

if (isLogin === false) {
    yetkisiz.style.display = "flex"
    yetkili.style.display = "none"
} else {
    yetkisiz.style.display = "none"
    yetkili.style.display = "block"
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    if(usernameInput.value === "" || passwordInput.value === ""){
        loginError.innerText = "These fields cannot be left blank."
        if(usernameInput.value === ""){
            usernameInput.focus()
        }
        if(passwordInput.value === ""){
            passwordInput.focus()
        }
        setTimeout(() => {
            loginError.innerText = ""
        }, 2000);
        return
    }
    if (usernameInput.value !== username || passwordInput.value !== password) {
        loginError.innerText = "Username or password is not correct."
        setTimeout(() => {
            loginError.innerText = ""
        }, 2000);
        return
    }
    yetkisiz.style.display = "none"
    fetch("http://localhost:3004/get-forms", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameInput.value, pass: passwordInput.value })
    })
        .then(res => res.json())
        .then(data => {
            yetkili.style.display = "block"
            console.log(data);
            renderForms(data.forms)
        })
        .catch(err => {
            console.log(err)
        })
})

const renderForms = (forms = []) => {
    for (i = 0; i < forms.length; i++) {
        const form = document.createElement("div")
        form.classList.add("formContainer")
        form.innerHTML= `
        <div class="formLeft">
            <div class="formRow" id="firstRow">
                <span class="formLabel">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                <span>${forms[i].name}</span>
            </div>
            <div class="formRow">
                <span class="formLabel">Surname&nbsp;: </span>
                <span>${forms[i].surname}</span>
            </div>
            <div class="formRow">
                <span class="formLabel">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                <span><a href="mailto:${forms[i].email}?subject=Contact form response">${forms[i].email}</a></span>
            </div>
            <div class="formRow">
                <span class="formLabel">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                <span>${new Date(forms[i].date).toLocaleDateString().replaceAll("/",".")}</span>
            </div>
        </div>

        <div class="formRight">
            <div>
                <span class="formLabel">Message: </span>
                <p class="formMessage">${forms[i].message}</p>
            </div>
        </div>
        `
        yetkili.appendChild(form)
    }
}
toTopBtn.addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:'smooth'})
})