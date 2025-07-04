import axios from 'axios';
import config from '../config.cjs';

const aiCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (!['ai', 'gpt', 'bot', 'dj'].includes(cmd)) return;
  if (!text) return await sock.sendMessage(m.from, { text: "🧠 Please provide a message for AI.\n\nExample: *.ai What is AI?*" }, { quoted: m });

  try {
    const { data } = await axios.get(`https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(text)}`);
    if (!data || !data.message) return await sock.sendMessage(m.from, { text: "❌ No response from AI." }, { quoted: m });

    await sock.sendMessage(m.from, {
      text: `🤖 *AI Response:*\n\n${data.message}`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `${config.BOT_NAME} - AI Chat`,
          body: "Powered by ArslanMD Official",
          mediaType: 1,
          previewType: "PHOTO",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error("AI Error:", err.message);
    await sock.sendMessage(m.from, { text: "❌ AI request failed." }, { quoted: m });
  }
};

export default aiCommand;
