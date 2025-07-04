import axios from "axios";
import yts from "yt-search";
import config from "../config.cjs";

const songCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const command = "song";
  const body = m.body || "";
  const cmd = body.startsWith(prefix) ? body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const query = body.slice(prefix.length + command.length).trim();

  if (cmd !== command) return;

  if (!query) {
    return sock.sendMessage(m.from, { text: "*❌ Please provide a song name to search.*" }, { quoted: m });
  }

  try {
    await sock.sendMessage(m.from, { react: { text: "🎶", key: m.key } });

    const search = await yts(query);
    if (!search.videos.length) {
      return sock.sendMessage(m.from, { text: `❌ No result found for "${query}".` }, { quoted: m });
    }

    const video = search.videos[0];
    const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${video.url}`;
    const response = await axios.get(apiUrl);

    if (!response.data.success) {
      return sock.sendMessage(m.from, { text: "❌ Failed to fetch song download link." }, { quoted: m });
    }

    const { title, download_url } = response.data.result;

    await sock.sendMessage(m.from, {
      audio: { url: download_url },
      mimetype: "audio/mp4",
      ptt: false,
      fileName: `${title}.mp3`,
      caption: `🎧 *${title}*\n🔎 *Search:* ${query}\n🔗 *URL:* ${video.url}\n\n🤖 *Bot:* ${config.BOT_NAME}\n👑 *Owner:* ${config.OWNER_NAME}`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "🎧 Arslan-Ai-2.0 WhatsApp Bot",
          body: "Download music, chat with AI, Islamic tools & more.",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error("🎵 SONG COMMAND ERROR:", err.message);
    await sock.sendMessage(m.from, { text: `❌ Error fetching song: ${err.message}` }, { quoted: m });
  }
};

export default songCommand;
