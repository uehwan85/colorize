// Local import
const db = require('../../db');
const queryStr = require('../../db/colors/list');

module.exports = function(params, cb) {
  console.log(`[model     ] received params like '${queryStr}' from controller...`)
  console.log(`[model     ] send query like '${queryStr}' to database...`);
  db.query(queryStr, params, function(err, rows) {
    console.log('[model     ] fetch rows from colors table in database...');
    cb(err, rows)
  })
}
