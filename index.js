// ✅ 匯入必要模組
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

// ✅ 建立 Express 應用程式
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ 設定 Cloudinary 金鑰（已替換為你的）
cloudinary.config({
  cloud_name: 'dwhn02tn5',
  api_key: '222767751424686',
  api_secret: 'N4OYQ4knD1T8FejxI7S0kACfXOU',
});

// ✅ 設定 CORS（允許從前端呼叫）
app.use(cors({
  origin: 'https://trashmap-background.vercel.app',
}));

app.use(bodyParser.json());

// ✅ 刪除圖片 API 路由
app.post('/delete-image', async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: '缺少 public_id' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result !== 'ok') throw new Error('Cloudinary 刪除失敗');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || '圖片刪除失敗' });
  }
});

// ✅ 預設首頁回應
app.get('/', (req, res) => {
  res.send('✅ TrashMap 刪除 API 已啟動');
});

// ✅ 啟動伺服器（本地測試時用）
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
