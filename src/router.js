
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const { verifyJWT } = require('./utilities');
const {
    staticHandler,
    jwtHandler,
    listHandler,
    profileDataHandler,
    profileUpdateHandler,
    loginHandler,
    logoutHandler,
    registrationHandler
} = require('./handler');

const router = (req, res) => {
    const endpoint = req.url;

    // home routes & sesssion auth verification
    if (endpoint === '/' || endpoint === '/index' || endpoint === '/list') {
        verifyJWT(req, (err, decoded) => {
            if (err || !decoded) { 
                staticHandler('public/auth.html', res);
            } else {
                // could static handler ping decoded payload name to browser?  
                staticHandler('public/list.html', res);  
            }
        }); 
    } else if (endpoint === '/profile') {
        verifyJWT(req, (err, decoded) => {
            if (err || !decoded) { 
                staticHandler('public/auth.html', res);
            } else {
                staticHandler('public/profile.html', res);  
            }
        });  
        

    } else if (endpoint === '/session') {
        jwtHandler(req, res);
    } else if (endpoint === '/login') {
        //this comes in from auth.html to authenticate user login
        //this will redirect to index.html if authorised
        loginHandler(req, res);
    } else if (endpoint === '/logout') {
        //this comes in from auth.html to authenticate user login
        //this will redirect to index.html if authorised
        logoutHandler(req, res);
    } else if (endpoint === '/register') {
        //this comes in from auth.html to sign up a user
        //this will redirect to profile.html (editable state)
        console.log("register route reached");
        registrationHandler(req, res);
    } else if (endpoint === '/list') {
        listHandler(req, res);
    } else if (endpoint === '/profile-data'){
        profileDataHandler(req, res); 
    } else if (endpoint === '/profile-update') {
        profileUpdateHandler(req, res);
    } else if (endpoint.indexOf('public') !== -1) {
        staticHandler(endpoint, res);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>404 page not found</h1>');
    }

}

module.exports = router;