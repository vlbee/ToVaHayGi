const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { verifyJWT } = require('./utilities');

const {
  checkNewUserExists,
  addNewUser,
  loginAuth,
  updateUser,
  getProfileData,
  getListData,
} = require('./queries');

const staticHandler = (req, res) => {
  const extension = req.split('.')[1]; // url or query string?
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
  };

  fs.readFile(path.join(__dirname, '..', req), 'utf8', (error, file) => {
    if (error) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('server error');
    } else {
      res.writeHead(200, { 'content-type': extensionType[extension] });
      res.end(file);
    }
  });
};

const listHandler = (req, res) => {
  verifyJWT(req, (err, decoded) => {
    getListData((error, userListData) => {
      if (error) {
        console.log(error);
        res.writeHead(500, 'Content-Type:text/html');
        res.end('<h1>500 Server Error<h1>');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userListData));
      }
    });
  });
};

const profileDataHandler = (req, res) => {
  verifyJWT(req, (err, decoded) => {
    getProfileData(decoded.userId, (error, profileData) => {
      if (error) {
        console.log(error);
        res.writeHead(500, 'Content-Type:text/html');
        res.end('<h1>500 Server Error<h1>');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(profileData));
      }
    });
  });
};

const profileUpdateHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    body = JSON.parse(body);
    const inputData = [];
    for (const item in body.data) {
      inputData.push(body.data[item]);
    }
    verifyJWT(req, (err, decoded) => {
      updateUser(decoded.userId, inputData, (error, profileData) => {
        if (error) {
          console.log(error);
          res.writeHead(500, 'Content-Type:text/html');
          res.end('<h1>500 Server Error<h1>');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(profileData));
        }
      });
    });
  });
};

const loginHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    body = JSON.parse(body);
    const userDetails = [body.data.logEmail, body.data.logPassword];
    loginAuth(userDetails, (error, userID) => {
      if (error) {
        console.log(error);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({
          message: 'Authentication Failure!',
        }));
      } else {
        console.log(`${body.data.logEmail} has logged in`);
        const token = sign(userID, process.env.JWT_SECRET);
        // add secure when pushing to Heroku
        res.writeHead(200, {
          'Set-Cookie': `jwt=${token}; HttpOnly; Max-Age=86400`,
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify({
          message: 'Authentication Success!',
          route: '/',
        }));
      }
    });
  });
};

const logoutHandler = (req, res) => {
  res.writeHead(200, {
    'Set-Cookie': 'jwt=null; HttpOnly; Max-Age=0',
    'Content-Type': 'text/plain',
  });
  res.end(JSON.stringify({
    message: 'Logout success!',
    route: '/',
  }));
};

const registrationHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    body = JSON.parse(body);
    const userDetails = [body.data.regEmail];
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.log(err);
      else {
        bcrypt.hash(body.data.regPassword, salt, (err, hashed) => {
          if (err) console.log(err);
          else {
            userDetails.push(hashed);
            userDetails.push(salt);

            checkNewUserExists(userDetails)
              .then(addNewUser)
              .then((feedback) => {
                if (feedback) {
                  // CREATE USER PROFILE!!!
                  const token = sign(feedback, process.env.JWT_SECRET);
                  // add secure when pushing to Heroku
                  res.writeHead(200, {
                    'Set-Cookie': `jwt=${token}; HttpOnly; Max-Age=86400`,
                    'Content-Type': 'text/plain',
                  });
                  res.end(JSON.stringify({
                    message: 'Registration Success!',
                    route: '/profile',
                  }));
                } else {
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(JSON.stringify({
                    message: 'Registration failed. Sorry, that email is already in use.',
                  }));
                }
              })
              .catch(err => console.log(err));
          }
        });
      }
    });
  });
};

module.exports = {
  staticHandler,
  listHandler,
  profileDataHandler,
  profileUpdateHandler,
  loginHandler,
  logoutHandler,
  registrationHandler,
};
