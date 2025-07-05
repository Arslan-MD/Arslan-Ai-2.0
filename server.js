import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('✅ Bot is running!'));

exec('node index.js', (err, stdout, stderr) => {
  if (err) console.error('❌ Error starting bot:', err);
  console.log(stdout);
  console.error(stderr);
});

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
