const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 讀取 .env 檔

const app = express();
const PORT = process.env.PORT || 5000;

// 中介層設定
app.use(cors());
app.use(express.json());

// 資料庫連線
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 路由：挑戰功能
const challengeRoutes = require('./routes/challenges');
app.use('/api', challengeRoutes);

// 預設首頁路由（可選）
app.get('/', (req, res) => {
  res.send('理財小幫手後端運作中！');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
