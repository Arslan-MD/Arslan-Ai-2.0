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
const menu = `
✨ 𝗨𝗟𝗧𝗜𝗠𝗔𝗧𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗠𝗘𝗡𝗨 ✨

> Total Commands: Prefix: [ ${prefix} ]

═══════════════════
🌍  𝗦𝗬𝗦𝗧𝗘𝗠 𝗠𝗘𝗡𝗨 (12)
═══════════════════
| ⚡ | ${prefix}menu - All commands
| 🟢 | ${prefix}alive - Bot status
| 🛠️ | ${prefix}owner - Contact owner
| 📊 | ${prefix}stats - Bot analytics
| 🍔 | ${prefix}list - Command list
| 🔄 | ${prefix}restart - Restart bot
| 📝 | ${prefix}sc - Source code
| 🚀 | ${prefix}speed - Bot speed test
| 🔍 | ${prefix}ping - Check latency
| 💾 | ${prefix}backup - Backup data
| 📛 | ${prefix}reportbug - Report issues
| 🔐 | ${prefix}term - Termux setup guide
═══════════════════

═══════════════════
👑  𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 (18)
═══════════════════
| 🎮 | ${prefix}join <link> - Join group
| 🚪 | ${prefix}leave - Exit group
| 🩷 | ${prefix}autobio on/off - Auto-bio
| 🔒 | ${prefix}block @user - Block user
| 🧋 | ${prefix}likestatus - Auto-react
| 🔓 | ${prefix}unblock @user - Unblock
| 🤖 | ${prefix}antidelete on/off
| 🚫 | ${prefix}anticall on/off
| ⚙️ | ${prefix}settings - Bot settings
| 📝 | ${prefix}setname <text> - Change name
| 💰 | ${prefix}bc <text> - Broadcast
| 📲 | ${prefix}clone @user - Clone account
| 🗑️ | ${prefix}clearall - Clear chats
| 🔍 | ${prefix}spy <number> - Track user
| 📛 | ${prefix}ban @user - Ban globally
| 🔄 | ${prefix}update - Update bot
| 💻 | ${prefix}shell - Run terminal cmds
| 🔐 | ${prefix}eval - Execute code
═══════════════════
═══════════════════
🤖 𝗔𝗜 & 𝗖𝗛𝗔𝗧𝗕𝗢𝗧𝗦 (15)
═══════════════════
| 💬 | ${prefix}ai <query> - AI chat
| 🐞 | ${prefix}bug <report> - Report bug
| 📝 | ${prefix}report <issue> - Report
| 🚪 | ${prefix}chatbot on/off
| 🧠 | ${prefix}gpt <query> - ChatGPT
| 🎨 | ${prefix}xeon <prompt> - AI art
| 📚 | ${prefix}bard <query> - Google Bard
| 🤖 | ${prefix}alexa <query> - Voice AI
| 📄 | ${prefix}summarize <text> - TL;DR
| 🔍 | ${prefix}translate <lang> <text>
| 📊 | ${prefix}ocr - Extract text from img
| 🎙️ | ${prefix}voice <text> - Text-to-speech
| 📝 | ${prefix}rewrite <text> - Paraphrase
| 🔮 | ${prefix}gemini <prompt> - Gemini AI
| 🤯 | ${prefix}brainly <question> - Homework
═══════════════════

═══════════════════
📦 𝗠𝗘𝗗𝗜𝗔 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥𝗦 (20)
═══════════════════
| 🎶 | ${prefix}attp <text> - Text to sticker
| 🎬 | ${prefix}gimage <query> - Google images
| 🎧 | ${prefix}play <song> - Download audio
| 📹 | ${prefix}video <query> - Download video
| 🖼️ | ${prefix}sticker - Image to sticker
| 🎞️ | ${prefix}mp4 - Video to sticker
| 📀 | ${prefix}tomp3 - Video to audio
| 🖌️ | ${prefix}emix - Sticker edit
| ✂️ | ${prefix}crop - Crop images
| 🎚️ | ${prefix}contrast - Edit image
| 🖤 | ${prefix}bnw - Black & white filter
| 🔥 | ${prefix}burn - Fire effect
| ❄️ | ${prefix}freeze - Ice effect
| 🌈 | ${prefix}rainbow - Color effect
| 📜 | ${prefix}quote - Text on image
| 🎭 | ${prefix}memegen - Create meme
| 🏮 | ${prefix}trigger - Triggered effect
| 🦋 | ${prefix}butterfly - Butterfly effect
| 🖊️ | ${prefix}sketch - Pencil sketch
| 🧑‍🎨 | ${prefix}aiart <prompt> - AI art
═══════════════════

═══════════════════
🔍 𝗦𝗘𝗔𝗥𝗖𝗛 & 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 (25)
═══════════════════
| 🔎 | ${prefix}google <query>
| 📽️ | ${prefix}mediafire <url> - DL files
| 🚪 | ${prefix}facebook <url> - FB DL
| ❤️ | ${prefix}instagram <url> - IG DL
| 🚪 | ${prefix}tiktok <url> - TikTok DL
| 🎶 | ${prefix}lyrics <song>
| 🎬 | ${prefix}imdb <movie> - Film info
| 🔞 | ${prefix}nsfw - Adult content
| 📚 | ${prefix}wiki <query> - Wikipedia
| 🗞️ | ${prefix}news - Latest headlines
| 🏛️ | ${prefix}crypto <coin> - Prices
| 💸 | ${prefix}weather <city> - Forecast
| 📱 | ${prefix}phone <number> - Track
| 🏆 | ${prefix}score - Live sports
| 🎮 | ${prefix}steam <game> - Steam info
| 🛒 | ${prefix}shopee <product> - Price
| 📦 | ${prefix}npm <package> - NPM search
| 🎓 | ${prefix}course - Free courses
| 🏛️ | ${prefix}gov <id> - Gov data
| 🚀 | ${prefix}iss - ISS tracker
| 🌌 | ${prefix}apod - NASA pic of day
| 📡 | ${prefix}speedtest - Internet speed
| 🏦 | ${prefix}exchange <amount> <cur1> <cur2>
| 🎫 | ${prefix}coupon - Discount coupons
| 🧾 | ${prefix}invoice - Bill generator
═══════════════════
═══════════════════
🎮 𝗙𝗨𝗡 & 𝗚𝗔𝗠𝗘𝗦 (30)
═══════════════════
| 😂 | ${prefix}joke - Random jokes
| 🎲 | ${prefix}dice - Roll dice
| 🎯 | ${prefix}dart - Throw dart
| 🏀 | ${prefix}basket - Basketball
| ⚽ | ${prefix}football - Penalty shoot
| 🎰 | ${prefix}slot - Slot machine
| ♟️ | ${prefix}chess - Play chess
| 📜 | ${prefix}truth - Truth challenge
| 💀 | ${prefix}dare - Dare challenge
| 💔 | ${prefix}breakup - Fake breakup
| 💑 | ${prefix}couple - Match couples
| 🔮 | ${prefix}magic8 - 8-ball fortune
| 📛 | ${prefix}ship - Love calculator
| 🧩 | ${prefix}quiz - General quiz
| 🃏 | ${prefix}card - Draw card
| 🎭 | ${prefix}fact - Random facts
| 🎪 | ${prefix}wouldyourather
| 🎤 | ${prefix}karaoke - Sing challenge
| 🧠 | ${prefix}math <equation> - Calculator
| 🖼️ | ${prefix}findobj - Find objects
| 🧩 | ${prefix}wordle - Word puzzle
| 📖 | ${prefix}story - Random story
| 🎵 | ${prefix}guesssong - Song quiz
| 🎬 | ${prefix}guessmovie - Movie quiz
| 🎨 | ${prefix}guesslogo - Brand quiz
| 🏛️ | ${prefix}countryquiz
| 🍔 | ${prefix}foodquiz
| 🐾 | ${prefix}animalquiz
| 🚗 | ${prefix}carquiz
| 👕 | ${prefix}fashionquiz
═══════════════════
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
