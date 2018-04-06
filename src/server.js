const http = require('http'); 
const router = require('./router'); 

require('env2')('./config.env');

const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 4000; 

const server = http.createServer(router); 

server.listen(port, () => {
    console.log(`Stack-match working at http://${host}:${port}`); 
}); 


