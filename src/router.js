const { staticHandler, listHandler, profileHandler } = require('./handler'); 

const router = (req, res) => {
    const endpoint = req.url; 
    
    if (endpoint === '/') {
        staticHandler(req, res); 
    }
    else if (endpoint.indexOf('public') !== -1) {
        staticHandler(req, res); 
    }
    else if (endpoint === '/user_list') {
        listHandler(req, res); 
    }
    else if (endpoint === '/user_profile') {
        profileHandler(req, res); 
    }
    //TO DO: add paths: create or update profile
    else {
        res.writeHead(404, {'Content-Type': 'text/html'}); 
        res.end('<h1>404 page not found</h1>'); 
    }

}

module.exports = router; 
