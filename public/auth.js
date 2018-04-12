var loginZone = document.getElementById("loginZone");
var registerZone = document.getElementById("registerZone");

var loginForm = document.getElementById("loginForm");
var registerForm = document.getElementById("registerForm");

var loginPassword = document.getElementById("logPassword");

var regEmail = document.getElementById("regEmail"); 
var regEmailValidation = document.getElementById("regEmailValidation"); 
var regPassword = document.getElementById("regPassword");
var regPasswordConf = document.getElementById("regPasswordConf");
var regPasswordValidation = document.getElementById("regPasswordValidation");
var regPasswordMatch = document.getElementById("regPasswordMatch");
var regEmptyValidation = document.getElementById("regEmptyValidation"); 

var errorMessage = document.getElementsByClassName("validation-error"); 

var loginButton = document.getElementById("loginButton");
var registerButton = document.getElementById("registerButton");
var switchButtons = document.getElementsByClassName("switch-button");

var loginValidation = document.getElementById("loginValidation");



//toggle between sign in and sign up
for (var i = 0; i < switchButtons.length; i++) {
  switchButtons[i].addEventListener("click", function (e) {
    e.preventDefault();
    loginZone.classList.toggle("hidden");
    registerZone.classList.toggle("hidden");
  });
}

//login submit function - validates credentials and sends request to backend
loginButton.addEventListener("click", function (e) {
  var loginCredentials = packageFormData(loginForm);
  clientRequest("POST", "/login", loginCredentials, function (response) {
    console.log(response);
    if (response.route && response.message === "Authentication Success!") {
      window.setTimeout(function () {
        window.location.replace(response.route);
      }, 1000);
    } else {
      var errorMessage =
        "Sorry, we have no record of that username/password combination. Please try again or register.";
      loginValidation.innerText = errorMessage;
      loginForm.reset();
    }
  });
});

//register submit function - validates credentials and adds user to database
registerButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(errorMessage); 
  //clears the error message paragraph 
  Array.from(errorMessage).forEach(function(message){
    message.innerHTML=""; 
  }); 
 
  //checks that email and password fields aren't empty
  if (!regEmail.value || !regPassword.value){
    regEmptyValidation.innerHTML = "Please provide an email and password." 
  }else { 
  if (regEmail.validity.patternMismatch){
    regEmailValidation.innerHTML = "Please provide a valid email address."
  }
  else {
  //checks if password matches pattern 
  if (regPassword.validity.patternMismatch) {
    regPasswordValidation.innerHTML = "Your password must contain a minimum of 8 characters with both lower-case and upper-case characters and at least one number";
  } else {
    //checks that 2 passwords are the same
    if (regPassword.value !== regPasswordConf.value) {
      regPasswordMatch.innerHTML = "Your password and confirmation password do not match."
    } else {
      var registrationCredentials = packageFormData(registerForm);
      // This and the above function/even-listener need to be refactored!
      clientRequest("Post", "/register", registrationCredentials, function (
        registrationError
      ) {
        console.log(registrationError);
      });
    }
  }
}
}
});
