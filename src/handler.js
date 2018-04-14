const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const bcrypt = require('bcrypt');
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');

const {
  checkNewUserExists,
  addNewUser,
  loginAuth,
  updateUser,
  getProfileData,
  getListData
}
 = require('./queries');


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

const jwtHandler = (req, res) => {
  console.log('jwt handler reached');
  if (req.headers.cookie) {
    const { jwt } = parse(req.headers.cookie);
    verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        // if not logged in
        console.log(err);
      } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(decoded));
      }
    });
  }
};

const listHandler = (req, res) => {
  console.log('List handler reached');
  getListData((error, result) => {
    if (error) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end('<h1>Sorry, there was a problem getting user list information<h1>');
      console.log(error);
    } else {
      // target the JWT and decode its contents
      if (req.headers.cookie) {
        const { jwt } = parse(req.headers.cookie);
        verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
          if (err || !decoded) {
            // if not logged in
            console.log(err);
          } else {
            const userListData = result;
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(userListData));
          }
        });
      }
    }
  });
};

const profileDataHandler = (req, res) => {

  let { jwt } = parse(req.headers.cookie)
  verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
    console.log("Decoded ID:", decoded);

    getProfileData(decoded.userId, (error, result) => {
      if (error) {
        // res.writeHead(500, 'Content-Type:text/html');
        // res.end(
        //   '<h1>Sorry, there was a problem getting profile information<h1>'
        // );
        console.log(error);
      } else {
        // console.log('Profile data handler result:', result); 
        let profileData = JSON.stringify(result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(profileData);
      }
    });
  })
};

const profileUpdateHandler = (req, res) => {
  // console.log(req);
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    console.log(JSON.parse(body).data);
    body = JSON.parse(body);
    let inputData = [];
    for (let item in body.data) {
      console.log(body.data[item]);
      inputData.push(body.data[item]);
    }
    console.log(inputData);
    let { jwt } = parse(req.headers.cookie)
    verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
  
      updateUser(decoded.userId, inputData, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          let profileData = JSON.stringify(result);
          console.log(profileData);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(profileData);
        }
      })
    })
  })
}


// UPDATE PROFILE 
// console.log('Profile handler reached');
// let body = '';
// req.on('data', (chunk) => {
//   body += chunk;
// });
// req.on('end', () => {
//   const values = querystring.parse(body);
//   const result = Object.values(values);
//   result.pop(); // Removes submit button 'submit' valuee from end.

//   postProfileData(result, (error, response) => {
//     if (error) {
//       console.log('Error:', error);
//       res.writeHead(500, { 'Content-Type': 'text/html' });
//       res.end('<h1>Sorry there was an error</h1>');
//     } else {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end('Profile added to the database');
//     }
//   });
// });


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
    const userDetails = [body.data.logEmail, body.data.logPassword];
    loginAuth(userDetails, (error, response) => {
      console.log('Login Auth reached');
      if (error) {
        console.log('Error:', error);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({
          message: 'Authentication Failure!',
        }));
      } else {
        console.log(`${body.data.logEmail} has logged in`);
        console.log(response);
        // JWT created here
        // response is an array
        const token = sign(response, process.env.JWT_SECRET);
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
  console.log('Logout handler reached');
  console.log(`user has logged out`);
  res.writeHead(200, {
    'Set-Cookie': `jwt=null; HttpOnly; Max-Age=0`,
    'Content-Type': 'text/plain',
  });
  res.end(JSON.stringify({
    message: 'Logout success!',
    route: '/',
  }));
    // deleteJwt((error, response) => {
    //   if (error) {
    //     console.log('Error:', error);
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end(JSON.stringify({
    //       message: 'Jwt deletion error',
    //     }));
    //   } else {
    //     res.end(JSON.stringify({
    //       message: 'Logout success!',
    //       route: '/',
    //     }));
    //   }
    // });
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
  jwtHandler,
  listHandler,
  profileDataHandler,
  profileUpdateHandler,
  loginHandler,
  logoutHandler,
  registrationHandler,
};
