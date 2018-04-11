// Generic XHR Request
function clientRequest(method, url, body, callback) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("load", function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      var response = JSON.parse(xhr.responseText);
      callback(response);
    } else {
      console.log("XHR error", xhr.status);
    } 
  });
  xhr.open(method, url, true);
  xhr.send(body);
}
