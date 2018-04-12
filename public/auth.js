var loginZone = document.getElementById("loginZone");
var registerZone = document.getElementById("registerZone");

var loginForm = document.getElementById("loginForm");
var registerForm = document.getElementById("registerForm");

var loginPassword = document.getElementById("logPassword");

var loginButton = document.getElementById("loginButton");
var registerButton = document.getElementById("registerButton");
var switchButtons = document.getElementsByClassName("switch-button");

var loginValidation = document.getElementById("loginValidation");

for (var i = 0; i < switchButtons.length; i++) {
  switchButtons[i].addEventListener("click", function(e) {
    e.preventDefault();
    loginZone.classList.toggle("hidden");
    registerZone.classList.toggle("hidden");
  });
}

loginButton.addEventListener("click", function(e) {
  var loginCredentials = packageFormData(loginForm);
  clientRequest("POST", "/login", loginCredentials, function(response) {
    console.log(response);
    if (response.route && response.message === "Authentication Success!") {
        window.setTimeout(function() {
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

registerButton.addEventListener("click", function(e) {
  e.preventDefault();
  var registrationCredentials = packageFormData(registerForm);
    // This and the above function/even-listener need to be refactored!
  clientRequest("Post", "/register", registrationCredentials, function(
    registrationError
  ) {
    console.log(registrationError);
  });
});
