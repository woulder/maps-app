'use strict'

const auth = require('basic-auth');
const LOG = require('../../logConstants');

module.exports = db => (req, res) => {
  const msg = 'GET markers';
  console.log(msg);

  const username = auth(req).name;

  db.collection('markers').find({ username }).toArray(function(error, results) {
    if (error) {
      console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
      console.log(error);

      res.status(500).json({ error });
      return;
    }

    console.log([msg, LOG.OK].join(LOG.SEPARATOR));
    console.log(results);

    res.json(results);
  });
};