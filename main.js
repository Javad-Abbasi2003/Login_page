const userInput = document.querySelector('.user-input')
const passInput = document.querySelector('.first-pass')
const rePassInput = document.querySelector('.second-pass')
const userMsg = document.querySelector('.username-msg')
const passMsg = document.querySelector('.password-msg')
const rePassMsg = document.querySelector('.re-password-msg')
const loginMsg = document.querySelector('.login-msg')
const submitBtn = document.querySelector('.form-submit')
const regex = /^\w+([\.-]?\w+)+@[a-zA-Z]([\.-]?\w{1,9})\.([a-zA-Z]{2,3})$/;

submitBtn.addEventListener('click', submit)

function submit(event) {
    event.preventDefault();
    const userVal = userInput.value;
    const passVal = passInput.value;
    const rePassVal = rePassInput.value;
    let sendData = true;

    if (userVal.length === 0) {
        userMsg.innerText = 'Please enter your username.'
        userMsg.style.visibility = 'visible'
        sendData = false;
    }else if (!regex.test(userVal)) {
        userMsg.innerText = 'Please enter a valid username.'
        userMsg.style.visibility = 'visible'
        sendData = false;
    }
    if (passVal.length <= 4) {
        passMsg.innerText = 'Your password is too short.'
        passMsg.style.visibility = 'visible'
        sendData = false;
    }
    if (rePassVal !== passVal) {
        rePassMsg.innerText = 'please repeat your password.'
        rePassMsg.style.visibility = 'visible'
    }

    if (sendData) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              username: userVal,
              password: passVal
            }),
            headers: {
              'Content-type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                loginMsg.innerText = 'logged in successfully.'
                loginMsg.style.color = '#008000'
                loginMsg.style.visibility = 'visible'
            }else {
                loginMsg.innerText = 'logged in failed, please try again later.'
                loginMsg.style.color = '#eb0000'
                loginMsg.style.visibility = 'visible'
            }
            setTimeout(() => loginMsg.style.visibility = 'hidden', 4000)
        })
    }

    passInput.value = '';
    userInput.value = '';
    rePassInput.value = '';
}

userInput.addEventListener('focus', () => {
    userMsg.style.visibility = 'hidden';
});
passInput.addEventListener('focus', () => {
    passMsg.style.visibility = 'hidden';
});
rePassInput.addEventListener('focus', () => {
    rePassMsg.style.visibility = 'hidden';
});