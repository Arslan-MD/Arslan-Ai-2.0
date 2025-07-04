import axios from 'axios';
import config from '../config.cjs';

const openaiCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'openai') return;
  if (!text) return await sock.sendMessage(m.from, { text: "🔎 Provide text for OpenAI\nExample: *.openai who is Elon Musk*" }, { quoted: m });

  try {
    const { data } = await axios.get(`https://vapis.my.id/api/openai?q=${encodeURIComponent(text)}`);
    if (!data || !data.result) return await sock.sendMessage(m.from, { text: "❌ No response from OpenAI." }, { quoted: m });

    await sock.sendMessage(m.from, {
      text: `🧠 *OpenAI Response:*\n\n${data.result}`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "Chat with OpenAI",
          body: config.BOT_NAME,
          mediaType: 1,
          previewType: "PHOTO",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: m });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    await sock.sendMessage(m.from, { text: "❌ Failed to connect to OpenAI." }, { quoted: m });
  }
};

export default openaiCommand;
