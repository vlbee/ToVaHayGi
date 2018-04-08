const dbConnect = require('../database/db_connect'); 

const postProfileData = (values, cb)=> {

    const addNewUser = {
        text: 'INSERT INTO users(handle, first_name, surname, email, cohort, city, work_looking_status, about_me) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', 
        values: values
    }
    
    dbConnect.query(addNewUser, (err)=>{
        if (err){
            return cb(err);  
        }
     
        //get ID of new user
        dbConnect.query("SELECT users.id FROM users WHERE handle ='" + values[0] +"'", (err,res) => {
        if (err){
            return cb(err); 
        }
        let response = res.rows[0].id; 
        cb(null, response); 
        console.log("New user ID:", response); 
        })
    })
   
}

module.exports = postProfileData; 