// Add code below to query your database
const dbConnect = require('../database/db_connect');
// const pgpromise = require('pg-promise');

const checkNewUserExists = userDetails =>
  new Promise((resolve, reject) => {
    const userEmail = [userDetails[0]];
    const query = {
      name: 'check-new-user',
      text: 'SELECT * FROM users WHERE users.email= $1',
      values: userEmail,
    };
    dbConnect.query(query, (err, emailMatch) => {
      if (err) reject(err.message);
      if (emailMatch.rows.length === 0) {
        resolve(userDetails);
      } else if (emailMatch.rows.length > 0) {
        resolve();
      }
    });
  });

const addNewUser = userDetails =>
  new Promise((resolve, reject) => {
    if (userDetails) {
      const query = {
        name: 'add-new-user',
        text: 'INSERT INTO users (email, pw, salt) VALUES ($1,$2,$3) RETURNING users.id, users.email',
        values: userDetails,
      };
      dbConnect.query(query, (err, newUser) => {
        console.log("Newuser:", newUser)
        if (err) reject(err.message);
        console.log('new user ID: ', newUser.rows[0].id);
        
        const newUserID = { userId : newUser.rows[0].id, userEmail : newUser.rows[0].email };
        resolve(newUserID);
      });
    } else {
      resolve();
    }
  });
  

module.exports = {
  checkNewUserExists,
  addNewUser,
};
