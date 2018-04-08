const fs = require("fs");

const dbConnect = require("./db_connect.js");

if ((process.env.NODE_END = "test")) {
  sql = fs.readFileSync(`${__dirname}/test_db_build.sql`).toString();
} else {
  sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
}

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

