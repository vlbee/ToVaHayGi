// Add code below to query your database
const dbConnect = require("../database/db_connect");


const loginAuth = (userDetails, cb) => {
    const query =  {
        name: 'authenticate-user',
        text: `SELECT users.id, users.handle FROM users WHERE users.email = $1 AND users.pw = $2`,
        values: userDetails
    };
    console.log(userDetails);
    dbConnect.query(query, (err, res) => {
        if (err) return cb(err);
        
        if (res.rows.length === 0) {
            const loginError = new Error("Login failure");
            cb(loginError);
        } else {
            cb(null, res.rows)
        };
        // console.log(res);

    })
};

module.exports = loginAuth;