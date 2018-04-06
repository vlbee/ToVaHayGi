const fs = require("fs");

const dbConnect = require("./db_connect.js");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const build = dbConnect.query(sql, (err, res) => {
  if (err) throw err;
  console.log("Database tables created");
});

const runDbBuild = cb => {
  dbConnect.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

module.exports = runDbBuild;
