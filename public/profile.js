var updateForm = document.getElementById("updateProfile");
var profileView = document.getElementById("viewZone");


var updateButton = document.getElementById("updateButton");
var formFields = updateForm.childNodes;
var profileParas = profileView.childNodes;

console.log(profileParas);

updateButton.addEventListener("click", function(e) {
    e.preventDefault();
    const updateDetails = packageFormData(updateForm);
    console.log(updateDetails);
    clientRequest('PUT', '/profile-update', updateDetails, function(response) {
        console.log("This is the response afetr Update: ", response);
        window.location.replace('/profile');
        // populateUserProfile(response);
    });

});

function populateUserProfile(userData) {
  var parsedData = userData[0];
//   console.log("Parsed data", parsedData);

  formFields.forEach(function(item) {
    if (item.name) {
        // console.log(item.name);
        item.value = parsedData[item.name];
    }
  });

  profileParas.forEach(function(item) {
    if (item.id) {
        item.innerText = parsedData[item.id];
    }
  });

}

// IFFE on load
(function() {
  clientRequest("GET", "/profile-data", null, populateUserProfile);
})();
