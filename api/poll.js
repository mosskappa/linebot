<<<<<<< HEAD
const { pendingRequests } = require('./line-callback');

module.exports = (req, res) => {
  if (pendingRequests.size > 0) {
    const [requestId, { body }] = pendingRequests.entries().next().value;
    res.json({ requestId, method: 'POST', url: '/e/phuc4z55jis8y9xx/', body });
  } else {
    res.json({ empty: true });
  }
=======
const { pendingRequests } = require('./line-callback');

module.exports = (req, res) => {
  if (pendingRequests.size > 0) {
    const [requestId, { body }] = pendingRequests.entries().next().value;
    res.json({ requestId, method: 'POST', url: '/e/phuc4z55jis8y9xx/', body });
  } else {
    res.json({ empty: true });
  }
>>>>>>> 1378f029c3af3dcd13bacc6c7d37a0c19ad5b6b6
};