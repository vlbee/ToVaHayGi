const tape = require('tape');
const runDbBuild = require('../database/db_build');
const getListData = require('../queries/getListData');
const postProfileData = require('../queries/postProfileData');

tape('tape is working', t => {
  t.equals(1, 1, 'one equals one');
  t.end();
});