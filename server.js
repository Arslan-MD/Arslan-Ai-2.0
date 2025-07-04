// server.js or keepAlive.js
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('✅ Arslan-Ai-2.0 Powerfull Whatsapp bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ KeepAlive Server started on port ${PORT}`);
});
