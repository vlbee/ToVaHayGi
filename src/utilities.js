const { verify } = require('jsonwebtoken');
const { parse } = require('cookie');

// Check JWT and redirect to login page in no session present
const verifyJWT = (req, cb) => {
  if (req.headers.cookie) {
    const { jwt } = parse(req.headers.cookie);
    verify(jwt, process.env.JWT_SECRET, cb);
  } else {
    const err = new Error('No session cookie present');
    cb(err);
  }
};

module.exports = {
  verifyJWT,
};
