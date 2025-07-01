import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;

  if (m.body.startsWith(prefix + "menu")) {
    try {
      await sock.sendMessage(m.from, {
        react: { text: "🎀", key: m.key }
      });

      const videoPath = path.join(process.cwd(), 'media', 'menu.mp4');
      const audioPath = path.join(process.cwd(), 'media', 'menu.mp3');
      const imageUrl = 'https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg';

      const caption = `
╭━━━[ *🤖 ARSLAN-AI-2.0 MENU 🤖* ]━━━╮
┃🎀 *Owner:* ArslanMD Official
┃⚡ *Version:* 2.0.0
┃🛠 *Prefix:* ${prefix}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━🧠 *GPT MENU*━╮
┃💬 ${prefix}ai
┃🧠 ${prefix}gpt
┃📝 ${prefix}report
╰━━━━━━━━━━━━━━╯

╭━🔧 *SYSTEM MENU*━╮
┃⚡ ${prefix}alive
┃👑 ${prefix}owner
┃📜 ${prefix}list
╰━━━━━━━━━━━━━━╯
`.trim();

      // ✅ 1. Send image separately
      await sock.sendMessage(m.from, {
        image: { url: imageUrl },
        caption: `🎀 *Welcome to Arslan-Ai-2.0!*`,
      }, { quoted: m });

      // ✅ 2. Send button message (as text)
      await sock.sendMessage(m.from, {
        text: caption,
        footer: "🎀 Tap a button below to explore",
        buttons: [
          { buttonId: `${prefix}alive`, buttonText: { displayText: "✅ Bot Status" }, type: 1 },
          { buttonId: `${prefix}owner`, buttonText: { displayText: "👑 Owner" }, type: 1 },
          { buttonId: `${prefix}ai Hello`, buttonText: { displayText: "💬 Talk to AI" }, type: 1 }
        ],
        headerType: 1
      }, { quoted: m });

      // ✅ 3. Send video
      await sock.sendMessage(m.from, {
        video: fs.readFileSync(videoPath),
        caption: '🎥 *Watch Arslan-Ai-2.0 in Action!*',
        gifPlayback: true
      }, { quoted: m });

      // ✅ 4. Send audio (voice note)
      await sock.sendMessage(m.from, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Menu error:", err);
      await sock.sendMessage(m.from, {
        text: "❌ Error sending the menu. Please check your media files or URLs."
      }, { quoted: m });
    }
  }
};

export default menu;
