'use strict'

const LOG = require('../logConstants');

module.exports = db => (username, password, cb) => {
  db.collection('users').find({ username, password }).toArray(function(error, results) {
    if (error || results.length === 0) {
      return cb(null, false);
    }

    return cb(null, true);
  });
};