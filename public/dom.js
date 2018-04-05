// Variables
var usersList = document.getElementById('js-users-list');

// Generic Fetch Request
  function fetch(url, callback) {
    var xhr = new XMLHttpRequest();
  
    xhr.addEventListener("load", function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("fetch is working", url);
        var response = JSON.parse(xhr.responseText);
        callback(response);
      } else {
        console.log("XHR error", xhr.readyState);
      }
    });
    xhr.open('GET', url, true);
    xhr.send();
  }



  // User List Population
  function populateUserList(userData) { 

    console.log(userData);
      var userCard = document.createElement('li');
      userCard.className = 'user-card';

      var userInfo = document.createElement('header');
      userInfo.className = 'user-card-header';
      var userName = document.createElement('h2');
      userName.className = 'user-card';
      var userCohort = document.createElement('p');
      userCohort.className = 'user-card';

      var userSkills = document.createElement('section');
      userSkills.className = 'user-card-body';
      var userSkillsList = document.createElement('ul');
      userSkillsList.className = 'user-card';

      var userContact = document.createElement('footer');
      userContact.className = 'user-card-footer';
      var userLocation = document.createElement('p');
      userLocation.className = 'user-card';
      var userStatus = document.createElement('p');
      userStatus.className = 'user-card';
      var userContact = document.createElement('p');
      userCard.className = 'user-card';

      var skillList = ['JavaScript',,]
      var userCard = document.createElement('article');
      userCard.className = 'user-card';
      var userCard = document.createElement('article');
      userCard.className = 'user-card';
  }

  
// IFFE on load
  (function() {

   fetch('/userlist', populateUserList);

  })();