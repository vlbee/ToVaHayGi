const { staticHandler, listHandler, profileHandler, loginHandler } = require('./handler'); 

const router = (req, res) => {
    const endpoint = req.url; 
    
    if (endpoint === '/') {
        //function to check JWT to see if user is already logged in
        //redirects either to login page or directly to index.html
        if(true){ //if not logged in
        staticHandler('public/auth.html', res)   
        }
    }
    else if (endpoint === '/login') {
        //this comes in from auth.html to authenticate user login
        //this will redirect to index.html if authorised
        // const dummyReq = {
        //     'form': {
        //       email: 'john@test.com',
        //       pw: 'Johnpassword1!'
        //     }
        //   }
        console.log('Router Login Req: ', req);
        loginHandler(req, res);
    }
    else if (endpoint === '/signup') {
        //this comes in from auth.html to sign up a user
        //this will redirect to profile.html (editable state)

    }
    //this will be redundant when '/' directs to userlist
    else if (endpoint === '/userlist') {
        listHandler(endpoint, res); 
    }
    else if (endpoint === '/usernewprofile') {
        profileHandler(req, res); 
    }
    else if (endpoint.indexOf('public') !== -1) {
        staticHandler(endpoint, res); 
    }
    //TO DO: add paths: create or update profile
    else {
        res.writeHead(404, {'Content-Type': 'text/html'}); 
        res.end('<h1>404 page not found</h1>'); 
    }

}

module.exports = router; 
