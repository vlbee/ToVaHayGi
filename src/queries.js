const dbConnect = require('./database/db_connect');
const bcrypt = require('bcrypt');

const dbquery = (input, cb) => {
  dbConnect.query(input, (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

const checkNewUserExists = (userDetails) => 
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


const addNewUser = (userDetails) => 
  new Promise((resolve, reject) => {
    if (userDetails) {
      const query = {
        name: 'add-new-user',
        text:
          'INSERT INTO users (email, pw, salt) VALUES ($1,$2,$3) RETURNING users.id, users.email',
        values: userDetails,
      };
      dbConnect.query(query, (err, newUser) => {
        if (err) reject(err.message);
        const newUserID = { userId: newUser.rows[0].id, userEmail: newUser.rows[0].email };
        resolve(newUserID);
      });
    } else {
      resolve();
    }
  });


const loginAuth = (userDetails, cb) => {
  const userEmail = [userDetails[0]];
  const query = {
    name: 'authenticate-user',
    text: 'SELECT users.id, users.pw, users.email FROM users WHERE users.email = $1',
    values: userEmail,
  };
  dbConnect.query(query, (err, res) => {
    if (err) return cb(err);
    if (res.rows.length === 0) {
      const loginError = new Error('Login Failure - Email Does Not Exist!');
      cb(loginError);
    } else {
      bcrypt.compare(userDetails[1], res.rows[0].pw, (err, compRes) => {
        if (err) console.log(err);
        else if (compRes) {
          cb(null, { userId: res.rows[0].id, userEmail: res.rows[0].email });
        } else {
          const authError = new Error('Password Comparison Failure!');
          cb(authError);
        }
      });
    }
  });
};

const updateUser = (userID, values, cb) => {
  const text = `
  UPDATE users
  SET (
      handle, 
      first_name, 
      last_name, 
      email, 
      cohort, 
      city, 
      work_looking_status, 
      about_me
  )
  = ($1, $2, $3, $4, $5, $6, $7, $8)
  WHERE users.id = ${userID}
  `;

  const addNewUser = {
    text,
    values,
  };

  dbquery(addNewUser, cb);
};

const getListData = (cb) => {
  const allUsersWithSkills =
    'SELECT users.first_name, users.last_name, users.handle, users.cohort, users.city, users.work_looking_status, (SELECT array_agg(skills.skill) FROM skills JOIN user_skills ON user_skills.skill_id = skills.id WHERE user_skills.user_id = users.id) AS "skills" FROM users WHERE users.first_name IS NOT NULL';

  dbquery(allUsersWithSkills, cb);
};

const getProfileData = (userId, cb) => {
  const profileData = `SELECT users.first_name, users.last_name, users.handle, users.email, users.cohort, users.city, users.work_looking_status, users.about_me, (SELECT array_agg(skills.skill) FROM skills JOIN user_skills ON user_skills.skill_id = skills.id WHERE user_skills.user_id = users.id) AS skills FROM users WHERE users.id ='${userId}'`;

  dbquery(profileData, cb);
};

module.exports = {
  checkNewUserExists,
  addNewUser,
  loginAuth,
  updateUser,
  getProfileData,
  getListData
};
