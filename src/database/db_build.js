const fs = require("fs");

const dbConnect = require("./db_connect.js");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

// const runDbBuild = cb => {
// dbConnect.query(sql, (err, res) => {
//   if (err) return cb(err);
//   cb(null, res);
// });
// }

dbConnect.query(sql, (err, res) => {
  if (err) {
    throw err;
  }
  console.log("superheroes table created with result: ", res);
});

//export function for testing
// module.exports = runDbBuild;
