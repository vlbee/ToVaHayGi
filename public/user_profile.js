var url = location.search; 
var userId = url.split('=')[1]; 
// console.log("UserId", userId)
var header = document.querySelector('header'); 
var info = document.getElementById('user_info')

fetch('/user_data?id=' + userId, populateUserProfile);

function populateUserProfile(profileData){

var userData = profileData[0]; 
console.log(userData); 
var title = document.createElement('h1'); 
title.textContent= userData.first_name + ' ' + userData.surname; 
header.appendChild(title); 

var handle = document.createElement('p'); 
handle.textContent= userData.handle; 
header.appendChild(handle); 

var cohort = document.createElement('p'); 
cohort.textContent= 'FAC cohort:' + userData.cohort; 
info.appendChild(cohort); 

var location = document.createElement('div'); 
var locationIcon = document.createElement('i'); 
locationIcon.classList.add('fas', 'fa-map-marker-alt');
location.appendChild(locationIcon);   
var city = document.createElement('p');
city.textContent = userData.city; 
location.appendChild(city); 
info.appendChild(location); 

var work = document.createElement('div'); 
var workPara = document.createElement('p'); 
if (userData.work_looking_status == 'Y'){
    workPara.textContent = 'Open to new opportunities'
}else {workPara.textContent = 'I am not looking for a new job'}
work.appendChild(workPara); 
info.appendChild(work); 

var aboutMe = document.getElementById('about_me'); 
if (userData.about_me !== null){ aboutMe.textContent += userData.about_me; } 

}
  