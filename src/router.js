const { staticHandler, listHandler, newProfileHandler, profileHandler, userDataHandler } = require('./handler'); 

const router = (req, res) => {
    const endpoint = req.url; 
    
    if (endpoint === '/') {
        staticHandler('public/index.html', res) 
    }
    else if (endpoint === '/user_list') {
        listHandler(endpoint, res); 
    }
    else if (endpoint === '/create_profile') {
        newProfileHandler(req, res); 
    }
    else if (endpoint.indexOf('/user_profile?id=') !== -1){
        profileHandler(endpoint, res); 
    }
    else if (endpoint.indexOf('/user_data') !== -1){
        userDataHandler(endpoint, res); 
    }
    else if (endpoint.indexOf('public') !== -1) {
        staticHandler(endpoint, res); 
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'}); 
        res.end('<h1>404 page not found</h1>'); 
    }

}

module.exports = router; 
