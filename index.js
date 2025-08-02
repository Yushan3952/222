const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 3001;

cloudinary.config({
  cloud_name: 'dwhn02tn5',
  api_key: '899978884379254',
  api_secret: 'N4OYQ4knD1T8FejxI7S0kACfXOU',
});

const allowedOrigins = [
  'https://trashmap-background.vercel.app',
  'http://localhost:3000',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

app.post('/api/delete-image', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`✅ Cloudinary 刪除 API 已啟動，監聽埠號：${PORT}`);
});

