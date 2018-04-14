// Generic XHR Request
function clientRequest(method, url, body, callback) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function() {
    console.log(xhr.status);
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response);
    } else {
      console.log("XHR error", xhr.status);
    } 
  });
  xhr.open(method, url, true);
  xhr.send(body);
}


// Generic Form Data Packaging (Returns JSON String)
function packageFormData(form) {
  var formData = new FormData(form);
  var output = {
    data: {}
  };
  for (var key of formData.keys()) {
    output.data[key] = formData.get(key);
  }
  return JSON.stringify(output);
}

function logoutRedirection(response){
  window.setTimeout(() => {
      window.location.replace(response.route);
    }, 1000);
}