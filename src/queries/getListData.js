// Add code below to query your database
const dbConnect = require ('../database/db_connect');

const allUsersWithSkills = 'SELECT users.handle, users.first_name, users.surname, users.cohort, users.city, users.work_looking_status, skills.skill FROM user_skills JOIN users ON users.id = user_skills.user_id JOIN skills ON skills.id = user_skills.skill_id'

const getListData = cb => {
    dbConnect.query(allUsersWithSkills, (err, res) => {
        if(err) return cb(err);
        // console.log("res:rows: ", res.rows);
        cb(null, res.rows);
        // console.log(res);

    });
};

module.exports = getListData;