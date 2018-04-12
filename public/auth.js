const loginZone = document.getElementById('loginZone');
const registerZone = document.getElementById('registerZone');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

const loginEmail = document.getElementById('logEmail');
const loginPassword = document.getElementById('logPassword');
const loginValidation = document.getElementById('loginValidation');

const regEmail = document.getElementById('regEmail');
const regEmailValidation = document.getElementById('regEmailValidation');
const regPassword = document.getElementById('regPassword');
const regPasswordConf = document.getElementById('regPasswordConf');
const regPasswordValidation = document.getElementById('regPasswordValidation');
const regPasswordMatch = document.getElementById('regPasswordMatch');
const regEmptyValidation = document.getElementById('regEmptyValidation');

const errorMessage = document.getElementsByClassName('validation-error');

const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const switchButtons = document.getElementsByClassName('switch-button');

// toggle between sign in and sign up
for (let i = 0; i < switchButtons.length; i++) {
  switchButtons[i].addEventListener('click', (e) => {
    e.preventDefault();
    loginZone.classList.toggle('hidden');
    registerZone.classList.toggle('hidden');
  });
}

// login submit function - validates credentials and sends request to backend
loginButton.addEventListener('click', (e) => {
  loginValidation.innerHTML = '';
  if (loginEmail.validity.patternMismatch || loginPassword.validity.patternMismatch) {
    loginValidation.innerHTML = 'Please provide valid login details.';
  } else {
    // backend authentication request
    const loginCredentials = packageFormData(loginForm);
    clientRequest('POST', '/login', loginCredentials, (response) => {
      console.log(response);
      if (response.route && response.message === 'Authentication Success!') {
        window.setTimeout(() => {
          window.location.replace(response.route);
        }, 1000);
      } else {
        setTimeout(() => {
          const errorMessage =
            'Sorry, we have no record of that username/password combination. Please try again or register.';
          loginValidation.innerText = errorMessage;
          loginForm.reset();
        }, 500);
      }
    });
  }
});

// register submit function - validates credentials and adds user to database
registerButton.addEventListener('click', (e) => {
  e.preventDefault();
  // clears the error message paragraph
  Array.from(errorMessage).forEach((message) => {
    message.innerHTML = '';
  });

  // checks that email and password fields aren't empty
  if (!regEmail.value || !regPassword.value) {
    regEmptyValidation.innerHTML = 'Please provide an email and password.';
  } else if (regEmail.validity.patternMismatch) {
    regEmailValidation.innerHTML = 'Please provide a valid email address.';
  } else {
    // checks if password matches pattern
    if (regPassword.validity.patternMismatch) {
      regPasswordValidation.innerHTML =
          'Your password must contain a minimum of 8 characters with both lower-case and upper-case characters and at least one number';
    } else {
      // checks that 2 passwords are the same
      if (regPassword.value !== regPasswordConf.value) {
        regPasswordMatch.innerHTML = 'Your password and confirmation password do not match.';
      } else {
        // Request to backend
        const registrationCredentials = packageFormData(registerForm);
        // This and the above function/even-listener need to be refactored!
        clientRequest('Post', '/register', registrationCredentials, (response) => {
          console.log('response message:', response.message);
          if (response.route && response.message === 'Registration Success!') {
            window.setTimeout(() => {
              window.location.replace(response.route);
            }, 500);
          } else {
            setTimeout(() => {
              const errorMessage = 'Sorry, that email is already in use.';
              regEmailValidation.innerHTML = errorMessage;
              registerForm.reset();
            }, 500);
          }
        });
      }
    }
  }
});

// IFFE on load - clear any previous session storage. 
(function () {
  sessionStorage
})();