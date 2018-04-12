const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const pgpromise = require('pg-promise');
const bcrypt = require('bcrypt');
const getListData = require('./queries/getListData');
const postProfileData = require('./queries/postProfileData');
const loginAuth = require('./queries/loginAuth');
const { checkNewUserExists, addNewUser } = require('./queries/registerUser');

const staticHandler = (req, res) => {
  console.log('Static handler reached');
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
  console.log('List handler reached');
  getListData((error, result) => {
    if (error) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end('<h1>Sorry, there was a problem getting user list information<h1>');
      console.log(error);
    } else {
      const usersListData = JSON.stringify(result);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(usersListData);
    }
  });
};

const profileHandler = (req, res) => {
  console.log('Profile handler reached');
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const values = querystring.parse(body);
    const result = Object.values(values);
    result.pop(); // Removes submit button 'submit' valuee from end.

    postProfileData(result, (error, response) => {
      if (error) {
        console.log('Error:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Sorry there was an error</h1>');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Profile added to the database');
      }
    });
  });
};

const loginHandler = (req, res) => {
  console.log('Login handler reached');
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    console.log(body);
    body = JSON.parse(body);
    console.log(body);
<<<<<<< HEAD
    let userDetails = [body.data.logEmail, body.data.logPassword];
=======
    const userDetails = [body.data.logEmail, body.data.logPassword];
    // compare Hashed pw with bcrypt COMPARE
    // YEAH!! HASH THAT!
>>>>>>> master
    loginAuth(userDetails, (error, response) => {
      console.log('Login Auth reached');
      if (error) {
        console.log('Error:', error);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({
          message: 'Authentication Failure!',
        }));
      } else {
<<<<<<< HEAD
        console.log(`${body.data.logEmail} has logged in`);
        console.log(response);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify(
          {
            "message": "Authentication Success!",
            "route": "/list"
          }
        ));
=======
        console.log(`${body.data.email} has logged in`);
        console.log(response.id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({
          message: 'Authentication Success!',
          route: '/list',
        }));
>>>>>>> master
      }
    });
  });
};

const registrationHandler = (req, res) => {
  console.log('registration handler reached');
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
            console.log('inside bcrypt.hash!!');
            userDetails.push(hashed);
            userDetails.push(salt);

            checkNewUserExists(userDetails)
              .then(addNewUser)
              .then((feedback) => {
                if (feedback) {
                  // CREATE USER PROFILE!!!
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(JSON.stringify({
                    // ADD JWT COOKIE INFO
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
  profileHandler,
  loginHandler,
  registrationHandler,
};
