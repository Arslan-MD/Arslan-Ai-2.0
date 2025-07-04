import config from '../config.cjs';
import axios from 'axios';

const tiktokdl = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const q = m.body.split(' ').slice(1).join(' ');
  const reply = (text) => sock.sendMessage(m.from, { text }, { quoted: m });

  const validCmds = ['tiktokdl', 'tiktok'];
  if (!validCmds.includes(cmd)) return;

  if (!q) return reply(`📌 *Please provide a valid TikTok URL!*\n\nExample:\n${prefix}${cmd} https://vm.tiktok.com/example`);
  if (!q.includes("tiktok.com")) return reply("❌ *This does not look like a valid TikTok link.*");

  await sock.sendMessage(m.from, { react: { text: "⏳", key: m.key } });
  await reply("📥 *Downloading TikTok video... Please wait!*");

  try {
    const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.data) {
      return reply("⚠️ *Failed to fetch video. Server might be down or link is invalid.*");
    }

    const { title, like, comment, share, author, meta } = data.data;
    const videoUrl = meta.media.find(v => v.type === "video")?.org;
    const views = meta?.play_count || 'N/A';

    if (!videoUrl) return reply("❌ *Could not retrieve video URL.*");

    const caption =
`🎬 *TikTok Video Downloaded!*

👤 *Creator:* ${author.nickname} (@${author.username})
📝 *Title:* ${title || 'No title'}
👁️ *Views:* ${views}
❤️ *Likes:* ${like}
💬 *Comments:* ${comment}
🔁 *Shares:* ${share}

> Powered by *${config.BOT_NAME}*`;

    await sock.sendMessage(m.from, {
      video: { url: videoUrl },
      mimetype: "video/mp4",
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `${config.BOT_NAME} - TikTok Downloader`,
          body: `By ${config.OWNER_NAME}`,
          mediaType: 1,
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("❌ TikTok Downloader Error:", error.message);
    await reply(`🚨 *An error occurred while downloading:* ${error.message}`);
    await sock.sendMessage(m.from, { react: { text: "❗", key: m.key } });
  }
};

export default tiktokdl;
