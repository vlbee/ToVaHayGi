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
    clientRequest('POST', '/login', loginString, function(loginError){
        console.log(loginError); 
    })
})

