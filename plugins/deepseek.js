import axios from 'axios';
import config from '../config.cjs';

const deepseekCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'deepseek') return;
  if (!text) return await sock.sendMessage(m.from, { text: "💬 Provide a message for DeepSeek.\nExample: *.deepseek Hello*" }, { quoted: m });

  try {
    const { data } = await axios.get(`https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(text)}`);
    if (!data || !data.answer) return await sock.sendMessage(m.from, { text: "❌ No reply from DeepSeek." }, { quoted: m });

    await sock.sendMessage(m.from, {
      text: `🧠 *DeepSeek Response:*\n\n${data.answer}`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "DeepSeek AI",
          body: config.BOT_NAME,
          mediaType: 1,
          previewType: "PHOTO",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: m });
  } catch (err) {
    console.error("DeepSeek Error:", err.message);
    await sock.sendMessage(m.from, { text: "❌ DeepSeek request failed." }, { quoted: m });
  }
};

export default deepseekCommand;
