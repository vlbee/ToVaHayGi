const { sign, verify } = require('jsonwebtoken');
const { parse } = require('cookie');

//Check JWT and redirect to login page in no session present
const verifyJWT = (req, cb) => {
  if (req.headers.cookie) {
    let { jwt } = parse(req.headers.cookie);
    verify(jwt, process.env.JWT_SECRET, cb)
  } else {
    const err = new Error('No session cookie present')
    cb(err)
  } 
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
module.exports = {
  verifyJWT,
  jwtHandler
}

