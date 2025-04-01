<<<<<<< HEAD
const pendingRequests = new Map();

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('方法不允許');
  }

  const requestId = Date.now().toString();
  pendingRequests.set(requestId, { req, res, body: req.body });
  console.log(`收到 Line 請求，ID: ${requestId}`);

  // 等待內部客戶端處理，設定 5 秒超時（Vercel 免費方案限制 10 秒）
  setTimeout(() => {
    if (pendingRequests.has(requestId)) {
      res.status(504).send('處理超時');
      pendingRequests.delete(requestId);
    }
  }, 5000);
};

// 導出 pendingRequests 以便其他端點使用
=======
const pendingRequests = new Map();

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('方法不允許');
  }

  const requestId = Date.now().toString();
  pendingRequests.set(requestId, { req, res, body: req.body });
  console.log(`收到 Line 請求，ID: ${requestId}`);

  // 等待內部客戶端處理，設定 5 秒超時（Vercel 免費方案限制 10 秒）
  setTimeout(() => {
    if (pendingRequests.has(requestId)) {
      res.status(504).send('處理超時');
      pendingRequests.delete(requestId);
    }
  }, 5000);
};

// 導出 pendingRequests 以便其他端點使用
>>>>>>> 1378f029c3af3dcd13bacc6c7d37a0c19ad5b6b6
module.exports.pendingRequests = pendingRequests;