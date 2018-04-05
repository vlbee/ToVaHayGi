const path = require('path'); 
const fs = require('fs'); 
const querystring = require('querystring'); 
const getListData = require('./queries/getListData');

const staticHandler = (req, res) => {

console.log('Static handler reached'); 

}

const listHandler = (req, res) => {
    console.log('List handler reached'); 
    getListData((error, result) => {
        if (error) {
            res.writeHead(500, 'Content-Type:text/html');
            res.end('<h1>Sorry, there was a problem getting user list information<h1>');
            console.log(error);
            } else {
            let usersListData = JSON.stringify(result);
            res.writeHead(200, { 'content-type': 'application/json' });
            console.log('listHandler: ', usersListData);
            res.end(usersListData);
            }

    });
}

const profileHandler = (req, res) => {
    console.log('Profile handler reached'); 
}

module.exports = { staticHandler, listHandler, profileHandler }; 