// Add code below to query your database
const dbConnect = require("../database/db_connect");

const allUsersWithSkills = 'SELECT users.first_name, users.last_name, users.handle, users.cohort, users.city, users.work_looking_status, (SELECT array_agg(skills.skill) FROM skills JOIN user_skills ON user_skills.skill_id = skills.id WHERE user_skills.user_id = users.id) AS "skills" FROM users;'

const getListData = cb => {
  dbConnect.query(allUsersWithSkills, (err, res) => {
    if (err) return cb(err);
    // console.log("res:rows: ", res.rows);
    cb(null, res.rows);
    // console.log(res);
  });
};

module.exports = getListData;
