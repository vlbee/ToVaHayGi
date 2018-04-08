const { staticHandler, listHandler, newProfileHandler, profileHandler } = require('./handler'); 

const router = (req, res) => {
    const endpoint = req.url; 
    
    if (endpoint === '/') {
        staticHandler('public/index.html', res) 
    }
    else if (endpoint === '/user_list') {
        listHandler(endpoint, res); 
    }
    else if (endpoint === '/user_new_profile') {
        newProfileHandler(req, res); 
    }
    else if (endpoint.indexOf('/user_profile') !== -1){
        profileHandler(req, res); 
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
