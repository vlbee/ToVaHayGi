// Add code below to query your database
const bcrypt = require('bcrypt');
const dbConnect = require("../database/db_connect");


const loginAuth = (userDetails, cb) => {
    const userEmail = [userDetails[0]];
    const query =  {
        name: 'authenticate-user',
        text: `SELECT users.id, users.pw, users.email FROM users WHERE users.email = $1`,
        values: userEmail
    };
    console.log(userDetails);
    dbConnect.query(query, (err, res) => {
        if (err) return cb(err);
        
        if (res.rows.length === 0) {
            const loginError = new Error("Login Failure - Email Does Not Exist!");
            cb(loginError);
        } else {
            console.log('RES ROWSSSSSSS: ', res.rows[0].pw);
            bcrypt.compare(userDetails[1], res.rows[0].pw, (err, compRes) => {
                if (err) console.log(err);
                else {
                    if (compRes) {
                        cb(null, [res.rows[0].id, res.rows[0].email]);
                    } else {
                        const authError = new Error("Passowrd Comparison Failure!")
                        cb(authError);
                    }
                }
            });
        };
        // console.log(res);

    })
};

module.exports = loginAuth;