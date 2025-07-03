import axios from 'axios';

const pairCommand = async (sock, msg, sender, text) => {
  const prefix = global.config.PREFIX;
  const command = msg.body?.slice(prefix.length).split(' ')[0].toLowerCase();
  const args = msg.body?.trim().split(/\s+/).slice(1);

  if (command !== 'pair') return;

  const number = args[0] || sender.split('@')[0];

  try {
    const res = await axios.post('https://arslan-sessions.onrender.com/pair', {
      number
    });

    if (!res.data || !res.data.code) {
      return await sock.sendMessage(msg.from, {
        text: '❌ Failed to get pairing code. Please try again later.'
      }, { quoted: msg });
    }

    const code = res.data.code;
    const msgText = `🔑 *Pairing Code:*\n\`\`\`${code}\`\`\`\n\n📲 Enter this on web to complete pairing.\n\n💡 Your number: wa.me/${number}`;

    await sock.sendMessage(msg.from, {
      text: msgText
    }, { quoted: msg });

    // Polling session status
    let attempts = 0;
    const max = 100;
    const poll = setInterval(async () => {
      attempts++;
      try {
        const status = await axios.get(`https://arslan-sessions.onrender.com/status/${code}`);
        if (status.data?.status === 'PAIRED') {
          clearInterval(poll);
          await sock.sendMessage(msg.from, {
            text: `✅ *Paired Successfully!*\n\n🔐 SESSION_ID:\n\`\`\`${status.data.session_id}\`\`\``
          }, { quoted: msg });
        }
      } catch {
        clearInterval(poll);
        await sock.sendMessage(msg.from, { text: '⚠️ Failed to fetch session status.' }, { quoted: msg });
      }
      if (attempts > max) {
        clearInterval(poll);
        await sock.sendMessage(msg.from, { text: '⏰ Timeout. Please try `.pair` again.' }, { quoted: msg });
      }
    }, 6000);
  } catch (err) {
    console.error('PAIR.JS ERROR:', err?.message || err);
    await sock.sendMessage(msg.from, {
      text: '❌ Failed to get pairing code. Please try again later.'
    }, { quoted: msg });
  }
};

export default pairCommand;
