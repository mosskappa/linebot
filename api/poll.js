const { pendingRequests } = require('./line-callback');

module.exports = (req, res) => {
  if (pendingRequests.size > 0) {
    const [requestId, { body }] = pendingRequests.entries().next().value;
    res.json({ requestId, method: 'POST', url: '/e/phuc4z55jis8y9xx/', body });
  } else {
    res.json({ empty: true });
  }
};
