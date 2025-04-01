const express = require('express');
const app = express();
app.use(express.json());

let pendingRequests = new Map();

app.post('/line-callback', (req, res) => {
  const requestId = Date.now().toString();
  pendingRequests.set(requestId, { req, res, body: req.body });
  console.log(`收到 Line 請求，ID: ${requestId}`);
  // 等待內部客戶端處理，設定 30 秒超時
  setTimeout(() => {
    if (pendingRequests.has(requestId)) {
      res.status(504).send('處理超時');
      pendingRequests.delete(requestId);
    }
  }, 30000);
});

app.get('/poll', (req, res) => {
  if (pendingRequests.size > 0) {
    const [requestId, { body }] = pendingRequests.entries().next().value;
    res.json({ requestId, method: 'POST', url: '/e/phuc4z55jis8y9xx/', body });
  } else {
    res.json({ empty: true });
  }
});

app.post('/response', (req, res) => {
  const { requestId, statusCode, body } = req.body;
  if (pendingRequests.has(requestId)) {
    const { res: originalRes } = pendingRequests.get(requestId);
    originalRes.status(statusCode).send(body);
    pendingRequests.delete(requestId);
  }
  res.send('回應已處理');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`服務運行在端口 ${PORT}`);
});