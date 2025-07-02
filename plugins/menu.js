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

✨ 𝗨𝗟𝗧𝗜𝗠𝗔𝗧𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗠𝗘𝗡𝗨 ✨

┆ ◦  🏃 nikal
┆ ◦  🤲 hold
┆ ◦  🤗 hug
┆ ◦  🏃 nikal
┆ ◦  🎵 hifi
┆ ◦  👉 poke
┆ ◦ 
╰─┈⊷

╭──·๏[🔄 *ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ* 🔄]
┆ ◦ 
┆ ◦  🏷️ sticker
┆ ◦  🏷️ sticker2
┆ ◦  😀 emojimix
┆ ◦  ✨ fancy
┆ ◦  🖼️ take
┆ ◦  🎵 tomp3
┆ ◦  🗣️ tts
┆ ◦  🌐 trt
┆ ◦  🔢 base64
┆ ◦  🔠 unbase64
┆ ◦  010 binary
┆ ◦  🔤 dbinary
┆ ◦  🔗 tinyurl
┆ ◦  🌐 urldecode
┆ ◦  🌐 urlencode
┆ ◦  🌐 url
┆ ◦  🔁 repeat
┆ ◦  ❓ ask
┆ ◦  📖 readmore
┆ ◦  💚 help
┆ ◦  💚 support
┆ ◦ 
╰─┈⊷

╭──·๏[🤖 *ᴀɪ ᴍᴇɴᴜ*🤖]
┆ ◦ 
┆ ◦  🧠 ai
┆ ◦  🤖 gpt3
┆ ◦  🤖 gpt2
┆ ◦  🤖 gptmini
┆ ◦  🤖 gpt
┆ ◦  🔵 meta
┆ ◦  📦 blackbox
┆ ◦  🌈 luma
┆ ◦  🎧 dj
┆ ◦  🧠 gpt4
┆ ◦  🔍 bing
┆ ◦  🎨 imagine
┆ ◦  🖼️ imagine2
┆ ◦  🤖 copilot
┆ ◦ 
╰─┈⊷

╭──·๏[⚡*ᴍᴀɪɴ ᴍᴇɴᴜ* ⚡]
┆ ◦ 
┆ ◦  🏓 ping
┆ ◦  🚀 speed
┆ ◦  📡 live
┆ ◦  💚 alive
┆ ◦  ⏱️ runtime
┆ ◦  ⏳ uptime
┆ ◦  📦 repo
┆ ◦  👑 owner
┆ ◦  📜 menu
┆ ◦  📜 menu2
┆ ◦  🔄 restart
┆ ◦ 
╰─┈⊷

╭──·๏[🎎 *ᴀɴɪᴍᴇ ᴍᴇɴᴜ* 🎎] 
┆ ◦ 
┆ ◦  🤬 fack
┆ ◦  ✅ truth
┆ ◦  😨 dare
┆ ◦  🐶 dog
┆ ◦  🐺 awoo
┆ ◦  👧 garl
┆ ◦  👰 waifu
┆ ◦  🐱 neko
┆ ◦  🧙 megnumin
┆ ◦  🐱 neko
┆ ◦  👗 maid
┆ ◦  👧 loli
┆ ◦  📰 animenews
┆ ◦  🦊 foxgirl
┆ ◦  🍥 naruto
┆ ◦ 
╰─┈⊷

╭──·๏[ℹ️*ᴏᴛʜᴇʀ ᴍᴇɴᴜ* ℹ️]
┆ ◦ 
┆ ◦  🕒 timenow
┆ ◦  📅 date
┆ ◦  🔢 count
┆ ◦  🧮 calculate
┆ ◦  🔢 countx
┆ ◦  🎲 flip
┆ ◦  🪙 coinflip
┆ ◦  🎨 rcolor
┆ ◦  🎲 roll
┆ ◦  ℹ️ fact
┆ ◦  💻 cpp
┆ ◦  🎲 rw
┆ ◦  💑 pair
┆ ◦  💑 pair2
┆ ◦  ✨ fancy
┆ ◦  🎨 logo <text>
┆ ◦  📖 define
┆ ◦  📰 news
┆ ◦  🎬 movie
┆ ◦  ☀️ weather
┆ ◦  📦 srepo
┆ ◦  🤬 insult
┆ ◦  💾 save
┆ ◦  🌐 wikipedia
┆ ◦  🔑 gpass
┆ ◦  👤 githubstalk
┆ ◦  🔍 yts
┆ ◦  📹 ytv
┆ ◦ 
╰━[ *Arslan-MD v2.0* ]━━⬣
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
