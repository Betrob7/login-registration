document.querySelector('#buttonLogin').addEventListener('click', (event) => {
    event.preventDefault();
    validateLogin();
})
document.querySelector('#signUp').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#divRegistration').classList.remove('d-none');
    document.querySelector('#divLogin').classList.add('d-none');
})
document.querySelector('#buttonRegistration').addEventListener('click', (event) => {
    event.preventDefault();
    validateRegistration();
});

function validateRegistration() {
    console.log('validateRegistration()');
    document.querySelector('#divRegistration').classList.remove('d-none');
    
    let usernameRef = document.querySelector('#usernameRegistration');
    let passwordRef = document.querySelector('#passwordRegistration');
    let passwordCheckRef = document.querySelector('#passwordCheckRegistration');
    let checkboxRef = document.querySelector('#checkbox');
    let errorMsg = document.querySelector('#errorMessage');
    

    errorMsg.classList.add('d-none');

    let users = JSON.parse(localStorage.getItem('users')) || [];

    try {if(usernameRef.value.length < 6) {
        usernameRef.focus();
        throw new Error('Your username needs to be at least 6 characters long!')
    } else if(users.some(user => user.username === usernameRef.value)) {
        usernameRef.focus();
        throw new Error('User does already exist!')
    } else if(passwordRef.value.length < 8) {
        passwordRef.focus();
        throw new Error('Password needs to be at least 8 characters long!')
    } else if(passwordCheckRef.value !== passwordRef.value) {
        passwordCheckRef.focus();
        throw new Error('Passwords must match!')
    } else if(!checkboxRef.checked) {
        checkboxRef.focus();
        throw new Error('You need to agree with our terms and conditions!')
    }

    let newUser = {
        username: usernameRef.value,
        password: passwordRef.value 
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    usernameRef.value = '';
    passwordRef.value = '';
    passwordCheckRef.value = '';
    checkboxRef.checked = false;
    
    
    return true;
        
    } catch (error) {
       errorMsg.classList.remove('d-none');
       errorMsg.textContent = error.message;
        
    }
    
}

function validateLogin() {
    console.log('validateLogin()');

    let usernameRef = document.querySelector('#usernameLogin');
    let passwordRef = document.querySelector('#passwordLogin');
    let errorMsg = document.querySelector('#errorMessageLogin')

    errorMsg.classList.add('d-none')

    let users = JSON.parse(localStorage.getItem('users')) || [];

    try { 
        let user = users.find(user => user.username === usernameRef.value);
        if (!user) {
            usernameRef.focus();
            throw new Error('User does not exist!');
         } else if(user.password !== passwordRef.value) {
            passwordRef.focus();
            throw new Error('Incorrect password!');
         }

         return true;
        
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('d-none');
    }
    

}