// Add code below to query your database
const dbConnect = require("../database/db_connect");

const checkNewUserExists = (userDetails) => {
  return new Promise((resolve, reject) => {
    let userEmail = [userDetails[0]];
    const query =  {
        name: 'check-new-user',
        text: `SELECT * FROM users WHERE users.email= $1`,
        values: userEmail
    };
    dbConnect.query(query, (err, emailMatch) => {
        if (err) reject(err.message);
        if (emailMatch.rows.length === 0) {
            resolve(userDetails);
        } else if (emailMatch.rows.length > 0) {
            resolve();
        }
    })
  })  
};


const addNewUser = (userDetails) => {

    if (userDetails) {
        return new Promise((resolve, reject) => {
            const query =  {
                name: 'add-new-user',
                text: `INSERT INTO users (email, pw) VALUES ($1,$2) RETURNING users.id`, //return user handle?? 
                values: userDetails
            };
            dbConnect.query(query, (err, newUserID) => {
                if (err) reject(err.message);  // add handle to this??? 
                console.log('new user ID: ', newUserID)
                resolve(newUserID);
            })
        })
    } else {
        console.log('user email already in database');
    }
};

module.exports = {
    checkNewUserExists, 
    addNewUser
};