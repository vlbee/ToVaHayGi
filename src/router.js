const { staticHandler, listHandler, profileHandler } = require('./handler'); 

const router = (req, res) => {
    const endpoint = req.url; 
    
    if (endpoint === '/') {
        staticHandler('public/index.html', res) 
    }
    else if (endpoint.indexOf('public') !== -1) {
        staticHandler(endpoint, res); 
    }
    else if (endpoint === '/userlist') {
        listHandler(endpoint, res); 
    }
    else if (endpoint === '/usernewprofile') {
        profileHandler(req, res); 
    }
    //TO DO: add paths: create or update profile
    else {
        res.writeHead(404, {'Content-Type': 'text/html'}); 
        res.end('<h1>404 page not found</h1>'); 
    }

}

module.exports = router; 
