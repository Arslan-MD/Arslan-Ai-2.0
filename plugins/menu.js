import fs from 'fs';
import path from 'path';
import axios from 'axios';
import config from '../config.cjs';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "menu") {
    try {
      // 🎀 React
      await sock.sendMessage(m.from, {
        react: { text: "🎀", key: m.key }
      });

      // 📝 Menu Text
      const menuText = `
╭━━━[ *🤖 ARSLAN-AI-2.0* ]━━━╮
┃🎀 *Version:* 2.0.0
┃👑 *Owner:* ArslanMD
┃⚡ *Prefix:* ${prefix}
╰━━━━━━━━━━━━━━━━━━━━━━╯

🧠 *AI Commands*
• ${prefix}ai
• ${prefix}gpt
• ${prefix}bug

🎮 *Owner Tools*
• ${prefix}join
• ${prefix}leave
• ${prefix}autobio

🎧 *Download*
• ${prefix}play
• ${prefix}facebook
• ${prefix}instagram

🧰 *Utility*
• ${prefix}menu
• ${prefix}alive
• ${prefix}owner

🔗 *Fun + Search*
• ${prefix}google
• ${prefix}imdb
• ${prefix}roast
`.trim();

      // 📁 Media paths
      const videoPath = path.join(process.cwd(), 'media', 'menu.mp4');
      const audioPath = path.join(process.cwd(), 'media', 'menu.mp3');

      // ✅ Check media exists
      if (!fs.existsSync(videoPath)) throw new Error("❌ menu.mp4 not found");
      if (!fs.existsSync(audioPath)) throw new Error("❌ menu.mp3 not found");

      const videoBuffer = fs.readFileSync(videoPath);
      const audioBuffer = fs.readFileSync(audioPath);

      // 🖼️ Fetch thumbnail from GitHub
      const thumbnailUrl = 'https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg';
      const thumbnailResponse = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });
      const thumbnailBuffer = Buffer.from(thumbnailResponse.data, 'binary');

      // 🎥 Send Video + Caption
      await sock.sendMessage(m.from, {
        video: videoBuffer,
        caption: menuText,
        gifPlayback: false,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: "Arslan-Ai-2.0 Menu",
            body: "Tap to explore",
            mediaType: 2,
            previewType: "VIDEO",
            renderLargerThumbnail: true,
            sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
          }
        }
      }, { quoted: m });

      // 🔊 Send Audio with Thumbnail
      await sock.sendMessage(m.from, {
        document: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: 'Arslan-Ai-2.0-Theme.mp3',
        jpegThumbnail: thumbnailBuffer,
        caption: "🎧 *Arslan-Ai-2.0 Theme Audio*"
      }, { quoted: m });

    } catch (err) {
      console.error("❌ MENU ERROR:", err);
      await sock.sendMessage(m.from, {
        text: "❌ Menu Error: " + err.message
      }, { quoted: m });
    }
  }
};

export default menu;
