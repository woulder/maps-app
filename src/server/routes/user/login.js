'use strict'

const auth = require('basic-auth');
const LOG = require('../../logConstants');

module.exports = db => (req, res) => {
  const msg = 'POST login';
  console.log(msg);

  const authentication = auth(req);
  const creds = {
    username: authentication.name,
    password: authentication.pass
  };
  console.log(creds);

  if (!creds.username || !creds.password) {
    const error = 'Username and password required.';

    console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
    console.log(error);

    res.status(400).json({ error });
    return;
  }

  db.collection('users').find({ username: creds.username }).toArray(function(error, results) {
    if (error) {
      console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
      console.log(error);

      res.status(500).json({ error });
      return;
    }

    if (results.length === 0) {
      console.log('User "' + creds.username + '" does not exist. Creating...');

      db.collection('users').save(creds, (error, result) => {
        if (error) {
          console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
          console.log(error);

          res.status(500).json({ error });
          return;
        }

        const user = result.ops[0];

        console.log([msg, LOG.OK].join(LOG.SEPARATOR));
        console.log(user);

        res.json({ username: user.username });
      });

      return;
    }

    if (results.length > 1) {
      const error = 'Found multiple "' + creds.username + '" users - DB must be corrupted.';

      console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
      console.log(error);

      res.status(500).json({ error });
      return;
    }

    const user = results[0];

    if (user.password != creds.password) {
      const error = 'Password for user "' + creds.username + '" does not match.';

      console.log([msg, LOG.FAILED].join(LOG.SEPARATOR));
      console.log(error);

      res.status(403).json({ error });
      return;
    }

    console.log([msg, LOG.OK].join(LOG.SEPARATOR));
    console.log(results);

    res.json({ username: user.username });
  });
};