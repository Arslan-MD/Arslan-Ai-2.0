import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const menu = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "menu") {
    try {
      await sock.sendMessage(m.from, {
        react: { text: "🎀", key: m.key }
      });

      // ✅ GitHub-hosted image URL
      const imageUrl = 'https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg';

      // Local paths for video & audio
      const videoPath = path.join(process.cwd(), 'media', 'menu.mp4');
      const audioPath = path.join(process.cwd(), 'media', 'menu.mp3');

      const caption = `
╭━━━[ *🤖 ARSLAN-AI-2.0 MENU 🤖* ]━━━╮
┃🎀 *Owner:* ArslanMD Official
┃⚡ *Version:* 2.0.0
┃💠 *Power:* Ultrasonic Speed
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

*🔘 Tap a button to explore*
`.trim();

      // ✅ 1. Send GitHub image + buttons
      await sock.sendMessage(m.from, {
        image: { url: imageUrl },
        caption,
        footer: "🎀 Arslan-Ai-2.0 Bot Menu",
        buttons: [
          { buttonId: `${prefix}alive`, buttonText: { displayText: "✅ Bot Status" }, type: 1 },
          { buttonId: `${prefix}owner`, buttonText: { displayText: "👑 Owner" }, type: 1 },
          { buttonId: `${prefix}ai Hello`, buttonText: { displayText: "💬 Talk to AI" }, type: 1 }
        ],
        headerType: 4
      }, { quoted: m });

      // ✅ 2. Send video (local)
      await sock.sendMessage(m.from, {
        video: fs.readFileSync(videoPath),
        mimetype: 'video/mp4',
        gifPlayback: false,
        caption: '🎥 *Watch the full Arslan-Ai-2.0 experience!*'
      }, { quoted: m });

      // ✅ 3. Send audio (local)
      await sock.sendMessage(m.from, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Menu error:", err);
      await sock.sendMessage(m.from, { text: "❌ Error sending the menu." }, { quoted: m });
    }
  }
};

export default menu;
