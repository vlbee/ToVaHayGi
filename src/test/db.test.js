const tape = require('tape');
const runDbBuild = require('../database/db_build');
const getListData = require('../queries/getListData');
const postProfileData = require('../queries/postProfileData');
const { log } = console

tape('tape is working', t => {
  t.equals(1, 1, 'one equals one');
  t.end();
});


tape('Checks if the DB was successfully built', t => {
  runDbBuild((err, res) => {
    t.ok(res, 'The DB was built')
    t.error(err, 'No error on build');
    t.end();
  })
})

tape('Checks number of new tables created', t => {
  runDbBuild((err, res) => {
    t.error(err);
    let count = 0;
    res.forEach((result) => {
      if (result.command === 'CREATE') {
        count++;
      }
    })
    if (count > 0) {
      t.pass(count + ' new tables created')
    }
    t.end();
  })
})

tape('Checks the users table has 5 test users', t => {
  runDbBuild((err, res) => {
    getListData((err, res) => {
      t.error(err);
      log(res);
      if (res.length === 5) {
        t.pass('DB length is 5');
        t.end();
      }  
    })  
  })
})


// tape('Checks the users table exists', t => {
//   runDbBuild((err, res) => {
//     getListData((err, res) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(res);
//         if (res.length > 0) {
//           t.pass('DB length is more than 0');
//           t.end();
//         }
//       }
//     });
//   })
// })