var loginForm = document.getElementById("loginForm");
var loginButton = document.getElementById("loginButton"); 

loginButton.addEventListener('click', function(e){
    e.preventDefault(); 
    formData = new FormData(loginForm); 
    console.log("formData:", formData);
    var loginData = {
        credentials: {}, 
    }; 
    for (var key of formData.keys()){
     loginData.credentials[key] = formData.get(key); 
    }
    var loginString = JSON.stringify(loginData); 
    clientRequest('POST', '/login', loginString, function(loginError) {
        // this function is expecting an error message from the router
        // if there is no error there is no problem because the user will have been 
        // redirected
        console.log(loginError); 
    })
})

