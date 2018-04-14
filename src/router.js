const { verifyJWT } = require('./utilities');
const {
  staticHandler,
  jwtHandler,
  listHandler,
  profileDataHandler,
  profileUpdateHandler,
  loginHandler,
  logoutHandler,
  registrationHandler,
} = require('./handler');

const router = (req, res) => {
  const endpoint = req.url;

// home routes & sesssion verification
  if (endpoint === '/' || endpoint === '/index') {
    verifyJWT(req, (err, decoded) => {
      if (err || !decoded) {
        staticHandler('public/auth.html', res);
      } else {
        // could static handler ping decoded payload name to browser - no need for /session endpoint?
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
    verifyJWT(req, (err, decoded) => {
      if (err || !decoded) {
        console.log('/sesson:', err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(decoded));
      }
    });

// authorisation routes
  } else if (endpoint === '/register') {
    registrationHandler(req, res);
  } else if (endpoint === '/login') {
    loginHandler(req, res);
  } else if (endpoint === '/logout') {
    logoutHandler(req, res);

// protected routes
  } else if (endpoint === '/list') {
    listHandler(req, res);
  } else if (endpoint === '/profile-data') {
    profileDataHandler(req, res);
  } else if (endpoint === '/profile-update') {
    profileUpdateHandler(req, res);

// content loaders // 404 error handler
  } else if (endpoint.indexOf('public') !== -1) {
    staticHandler(endpoint, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>404 page not found</h1>');
  }
};

module.exports = router;
