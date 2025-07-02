import axios from 'axios';

const pair = async (m, sock) => {
  if (!m.body.startsWith('.pair')) return;

  try {
    const response = await axios.get('https://arslan-sessions.onrender.com/pair');
    const { code, status } = response.data;

    if (!code || status !== 'waiting') {
      return sock.sendMessage(m.from, {
        text: "❌ Failed to get pairing code. Please try again later.",
      }, { quoted: m });
    }

    // Send code to user
    await sock.sendMessage(m.from, {
      text: `🔗 *PAIRING STARTED!*\n\n📲 Pair your WhatsApp by entering this code:\n\n*${code}*\n\n✅ Open your bot link or scanner that uses this code to connect.\n\n🕐 Waiting for confirmation...`,
    }, { quoted: m });

    // Wait & poll session status
    const poll = async () => {
      try {
        const res = await axios.get(`https://arslan-sessions.onrender.com/status?code=${code}`);
        if (res.data.status === 'paired') {
          const sessionId = res.data.session_id;
          await sock.sendMessage(m.from, {
            text: `✅ *Paired Successfully!*\n\n🆔 *Your Session ID:*\n\`\`\`${sessionId}\`\`\`\n\n📦 Paste this in your bot's config file to start using your bot!`,
          }, { quoted: m });
        } else if (res.data.status === 'expired') {
          await sock.sendMessage(m.from, {
            text: "❌ *Pairing expired!*\nPlease type `.pair` again to generate a new code.",
          }, { quoted: m });
        } else {
          setTimeout(poll, 5000); // retry in 5s
        }
      } catch (err) {
        await sock.sendMessage(m.from, {
          text: "⚠️ *Pairing failed due to a network or server issue.* Try again later.",
        }, { quoted: m });
      }
    };

    // Start polling
    setTimeout(poll, 5000);

  } catch (err) {
    console.error("❌ Pair command error:", err);
    await sock.sendMessage(m.from, {
      text: "❌ *Unexpected error occurred while starting pairing.* Please try again later.",
    }, { quoted: m });
  }
};

export default pair;
