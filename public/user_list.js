// Variables
var usersList = document.getElementById('js-users-list');


// User List Population

function populateUserSkills(userSkills, skillsUl) {
  if (userSkills) {
    userSkills.forEach(function (userSkill) {
      var skill = document.createElement('li');
      skill.className = 'usercard__skill';
      skill.textContent = userSkill;
      skillsUl.appendChild(skill);
    })
  }
};

function createUserCard(user) {
  var card = document.createElement('article');
  card.className = 'usercard';

  var cardHeader = document.createElement('header');
  cardHeader.className = 'usercard__header';
  var name = document.createElement('h2');
  name.className = 'usercard__headername';
  var cohort = document.createElement('span');
  cohort.className = 'usercard__headercohort';
  var handle = document.createElement('span');
  handle.className = 'usercard__headerhandle';
  cardHeader.appendChild(name);
  cardHeader.appendChild(cohort);
  cardHeader.appendChild(handle);

  var cardSkills = document.createElement('section');
  cardSkills.className = 'usercard__body';
  var skillsList = document.createElement('ul');
  skillsList.className = 'usercard__bodyskills';
  populateUserSkills(user.skills, skillsList);
  cardSkills.appendChild(skillsList);

  var cardFooter = document.createElement('footer');
  cardFooter.className = 'usercard__footer';
  var location = document.createElement('span');
  location.className = 'usercard__footerlocation';
  var status = document.createElement('span');
  status.className = 'usercard__footerstatus';
  var contact = document.createElement('span');
  contact.className = 'usercard__footercontact';
  cardFooter.appendChild(location);
  cardFooter.appendChild(status);
  cardFooter.appendChild(contact);

  //Appending things
  card.appendChild(cardHeader);
  card.appendChild(cardSkills);
  card.appendChild(cardFooter);

  //Adding text content
  name.textContent = user.first_name + ' ' + user.surname;
  handle.textContent = user.handle;  
  cohort.textContent = user.cohort;

  location.textContent = user.city;
  status.textContent = user.work_looking_status;
  // contact.textContent = user.contact;
  return card;
}

function populateUserList(userData) {
  userData.forEach(function (user) {
    var userCard = createUserCard(user);
    usersList.appendChild(userCard);
  });

}

// IFFE on load
(function () {

  fetch('/user_list', populateUserList);

})();