const { staticHandler, listHandler, profileHandler } = require('./handler'); 

const router = (req, res) => {
    const { url } = req; 
    
    if (url === '/') {
        staticHandler(req, res); 
    }
    else if (url.indexOf('public') !== -1) {
        staticHandler(req, res); 
    }
    else if (url === '/user_list') {
        listHandler(req, res); 
    }
    else if (url === '/user_profile') {
        profileHandler(req, res); 
    }
    //TO DO: add paths: create or update profile
    else {
        res.writeHead(404, {'Content-Type': 'text/html'}); 
        res.end('404 page not found'); 
    }

}

module.exports = router; 
