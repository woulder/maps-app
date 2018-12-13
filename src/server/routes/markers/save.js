'use strict'

const auth = require('basic-auth');
const LOG = require('../../logConstants');

module.exports = db => (req, res) => {
  const msg = 'POST markers';
  console.log(msg);

  const username = auth(req).name;

  let data = Array.isArray(req.body) ? req.body : [req.body];
  data = data.filter(marker => marker.username === username);

  db.collection('markers').insertMany(data, (error, result) => {
    if (error) {
      console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
      console.log(error);
      res.status(500).json({ error });
      return;
    }

    console.log([msg, LOG.OK].join(LOG.SEPARATOR));
    console.log(result.ops);
    res.json(result.ops);
  });
};