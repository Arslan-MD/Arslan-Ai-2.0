// server.js — Keep Bot Alive + Launch index.js
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Keepalive route
app.get('/', (req, res) => {
  res.send('✅ Arslan-Ai-2.0 bot is running on Render!');
});

// Start the bot (index.js)
exec('node index.js', { cwd: __dirname }, (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Error starting bot:', err);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ KeepAlive server started on port ${PORT}`);
});
