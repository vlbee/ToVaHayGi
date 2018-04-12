const nav = document.getElementById('nav-profile');

// check if sessionStorage has data
// if not, do XHR with jwtData route
// fill localstorage with jwtData
// populate nav bar with sessionStorage jwtData

function populateNav() {
  const email = sessionStorage.getItem('email');
  nav.innerText = email;
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
