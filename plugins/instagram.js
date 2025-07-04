import config from '../../config.cjs';
import axios from 'axios';

const instagram = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCmds = ['ig', 'instagram', 'insta'];
  if (!validCmds.includes(cmd)) return;

  if (!text) {
    return sock.sendMessage(m.from, {
      text: `⚠️ *Please provide a valid Instagram URL!*\n\n📌 *Example:*\n${prefix}${cmd} https://www.instagram.com/reel/example/`
    }, { quoted: m });
  }

  try {
    await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });

    const { data } = await axios.get(`https://api.davidcyriltech.my.id/instagram?url=${encodeURIComponent(text)}`);

    if (!data || !data.success || !data.downloadUrl) {
      await sock.sendMessage(m.from, {
        text: "❌ *Instagram content could not be downloaded.*\nThe link might be invalid or unsupported."
      }, { quoted: m });
      return await sock.sendMessage(m.from, { react: { text: "❌", key: m.key } });
    }

    await sock.sendMessage(m.from, {
      video: { url: data.downloadUrl },
      mimetype: "video/mp4",
      caption: `🎬 *INSTAGRAM VIDEO DOWNLOADED SUCCESSFULLY!*\n\n🔗 ${text}\n\n> Powered by *${config.BOT_NAME}*`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `${config.BOT_NAME} - Instagram Downloader`,
          body: `By ${config.OWNER_NAME}`,
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("❌ Instagram Downloader Error:", error.message);
    await sock.sendMessage(m.from, {
      text: `❌ *Failed to download video!*\n_Reason:_ ${error.message || "Unknown error"}`
    }, { quoted: m });
    await sock.sendMessage(m.from, { react: { text: "❗", key: m.key } });
  }
};

export default instagram;
