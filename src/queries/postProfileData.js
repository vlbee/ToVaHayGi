const dbConnect = require('../database/db_connect'); 

const postProfileData = (values, cb)=> {

    const addNewUser = {
        text: 'INSERT INTO users(handle, first_name, surname, email, cohort, city, work_looking_status, about_me) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', 
        values: values
    }
    
    dbConnect.query(addNewUser, (err,res)=>{
        if (err){
            return cb(err); 
        }
        cb(null, res); 
        console.log("Insert new data:", res); 
    })
}

module.exports = postProfileData; 