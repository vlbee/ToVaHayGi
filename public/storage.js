<<<<<<< HEAD
const nav = document.getElementById('nav');
const navProfile = document.getElementById('nav-profile');
=======
var nav = document.getElementById('nav');
//navProfile declared in other js file
>>>>>>> master

// check if sessionStorage has data
// if not, do XHR with jwtData route
// fill localstorage with jwtData
// populate nav bar with sessionStorage jwtData

function populateNav() {
  var link = document.createElement('a'); 
  var email = sessionStorage.getItem('email');
  link.textContent = email;
  link.setAttribute('href', '/profile'); 
  navProfile.appendChild(link); 

  //logout button
  var logout = document.createElement("button");
  logout.className = 'logout';
  logout.textContent = 'Logout';
  nav.appendChild(logout);
  logout.addEventListener("click", function(){
    console.log('logout clicked')
    clientRequest('GET', '/logout', null, logoutRedirection);
  })
}

function logoutRedirection(response){
  console.log(response);
  sessionStorage.clear(); 
  window.setTimeout(() => {
      window.location.replace(response.route);
    }, 500);
}

function setStorage(jwtData) {
  sessionStorage.setItem('email', jwtData.userEmail);
  populateNav();
}

// IFFE on load
(function () {
  if (sessionStorage.email) {
    populateNav();
  } else {
    clientRequest('GET', '/session', null, setStorage);
    
  }
}());
