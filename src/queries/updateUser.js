const dbConnect = require('../database/db_connect'); 

const updateUser = (userID, values, cb)=> {

    var text = `
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
    `

    const addNewUser = {
        text: text, 
        values: values
    }
    
    dbConnect.query(addNewUser, (err,res)=>{
        if (err) {
            cb(err); 
        } else {
            cb(null, res); 
            console.log("Insert new data:", res);
        }
    })
}

module.exports = updateUser; 