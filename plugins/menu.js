import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const menu = async (m, sock) => {
const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

if (cmd === "menu") {
const start = new Date().getTime();

try {
await sock.sendMessage(m.from, {
react: {
text: "🎀",
key: m.key
}
});
} catch {}

const end = new Date().getTime();
const responseTime = (end - start) / 1000;

const menuText = `

════════════════════

> 🌟 𝔸𝕣𝕤𝕝𝕒𝕟-𝔸𝕚-𝟚.𝟘 🌟
> *Version: 2.0.0* |
🎀 *𝒟𝑒𝓋𝑒𝓁♡𝓅𝑒𝒹 𝒷𝓎 𝒜𝓇𝓈𝓁𝒶𝓃𝑀𝒟* 🎀
*ULTRA POWERFULL AND SPEED⚡
════════════════════

✨ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗠𝗘𝗡𝗨 ✨

> Explore the commands below to harness the bot's full power!


════════════════════
🌍  𝗦𝗬𝗦𝗧𝗘𝗠 𝗠𝗘𝗡𝗨 🌍
════════════════════
| ⚡ | ${prefix}menu
| 🟢 | ${prefix}alive
| 🛠️ | ${prefix}owner
| 🍔 | ${prefix}list
════════════════════

════════════════════
👑  𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 👑
════════════════════
| 🎮 | ${prefix}join
| 🚪 | ${prefix}leave
| 🩷 | ${prefix}autobio
| 🔒 | ${prefix}block
| 🧋 | ${prefix}likestatus
| 🔓 | ${prefix}unblock
| 🤖 | ${prefix}antidelete
| 🚫 | ${prefix}anticall
| 🛑 | ${prefix}settings
| 📝 | ${prefix}setname
════════════════════

════════════════════
🤖  𝗚𝗣𝗧 𝗠𝗘𝗡𝗨 🤖
════════════════════
| 💬 | ${prefix}ai
| 🐞 | ${prefix}bug
| 📝 | ${prefix}report
| 🚪 | ${prefix}chatbot
| 🧠 | ${prefix}gpt
| 🎨 | ${prefix}xeon
════════════════════

════════════════════
📦  𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥 𝗣𝗔𝗚𝗘 📦
════════════════════
| 🎶 | ${prefix}attp
| 🎬 | ${prefix}gimage
| 🎧 | ${prefix}play
| 📹 | ${prefix}video
════════════════════

════════════════════
🔍  𝗦𝗘𝗔𝗥𝗖𝗛 𝗠𝗘𝗡𝗨 🔍
════════════════════
| 🔎 | ${prefix}google
| 📽️ | ${prefix}mediafire
| 🚪 | ${prefix}facebook
| ❤️ | ${prefix}instagram
| 🚪 | ${prefix}tiktok
| 🎶 | ${prefix}lyrics
| 🎬 | ${prefix}imdb
| 🔞 | ${prefix}hwaifu/sex/xxx
════════════════════

════════════════════
🔍  𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 🔍
════════════════════
| 🔎 | ${prefix}getpp
| 📽️ | ${prefix}url
| 😂 | ${prefix}roast
════════════════════

🔧 Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ ᴍᴇɴᴜ!
ᴡᴀɪᴛ ғᴏʀ ᴍᴏʀᴇ ᴄᴏᴍᴍᴀɴᴅs...

📢 ᴅᴇᴠᴇʟᴏᴘᴇʀ ▌│█║▌║▌║   🎀 𝒜𝓇𝓈𝓁𝒶𝓃𝑀𝒟 🍑║▌║▌║█│▌
`.trim();

// 🎥 Local media folder path
const videoPath = path.join(process.cwd(), 'media', 'menu.mp4');
const audioPath = path.join(process.cwd(), 'media', 'menu.mp3');

// 🎥 Send local video with caption
await sock.sendMessage(m.from, {
video: fs.readFileSync(videoPath),
caption: menuText,
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

// 🔊 Send local audio (voice note)
await sock.sendMessage(m.from, {
audio: fs.readFileSync(audioPath),
mimetype: 'audio/mp4',
ptt: true
}, { quoted: m });

}
};

export default menu;
