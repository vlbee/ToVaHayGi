const path = require('path'); 
const fs = require('fs'); 
const querystring = require('querystring'); 

const staticHandler = (req, res) => {

console.log('Static handler reached'); 

}

const listHandler = (req, res) => {
    console.log('List handler reached'); 
}

const profileHandler = (req, res) => {
    console.log('Profile handler reached'); 
}

module.exports = { staticHandler, listHandler, profileHandler }; 