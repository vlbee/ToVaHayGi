const dbConnect = require("../database/db_connect");

const getProfileData = (userId, cb) => {

  const  profileData = "SELECT users.first_name, users.last_name, users.handle, users.email, users.cohort, users.city, users.work_looking_status, users.about_me, (SELECT array_agg(skills.skill) FROM skills JOIN user_skills ON user_skills.skill_id = skills.id WHERE user_skills.user_id = users.id) AS skills FROM users WHERE users.id ='" + userId +"'"

  dbConnect.query(profileData, (err, res) => {
    if (err) return cb(err);
    // console.log("Profile data res.rows: ", res.rows);
    cb(null, res.rows);
  });
};


module.exports = getProfileData; 