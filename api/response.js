const { pendingRequests } = require('./line-callback');

module.exports = (req, res) => {
  const { requestId, statusCode, body } = req.body;
  if (pendingRequests.has(requestId)) {
    const { res: originalRes } = pendingRequests.get(requestId);
    originalRes.status(statusCode).send(body);
    pendingRequests.delete(requestId);
  }
  res.send('回應已處理');
};