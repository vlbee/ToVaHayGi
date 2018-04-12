var updateForm = document.getElementById("updateProfile");
var formFields = updateForm.childNodes;

var username = document.getElementById("username");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var email = document.getElementById("email");
var cohort = document.getElementById("cohort");
var city = document.getElementById("city");
var aboutme = document.getElementById("aboutme");

function populateUserProfile(userData) {
  var parsedData = userData[0];
  console.log("Parsed data", parsedData);

  formFields.forEach(function(item) {
    if (item.name) {
        console.log(item.name);
        item.value = parsedData[item.name];
    }
  });

}

// IFFE on load
(function() {
  clientRequest("GET", "/profile-data", null, populateUserProfile);
})();
