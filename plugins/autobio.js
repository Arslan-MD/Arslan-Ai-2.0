import config from '../../config.cjs';
import moment from 'moment-timezone';

// 🌈 Array of ✨ Colorful ✨ Life Quotes 🎨
const lifeQuotes = [
  "💖 The only way to do great work is to love what you do. ❤️‍🔥",
  "🌟 Strive not to be a success, but rather to be of ✨ value ✨. 💎",
  "🧠 The mind is everything. What you think 💭 you become. 🔮",
  "🚀 Believe you can and you're halfway there! 🏆",
  "🌌 The future belongs to those who believe in the beauty of their dreams. 🦢",
  "⏳ It is never too late to be what you might have been. 🦋💫",
  "💥 Do not wait to strike till the iron is hot; but 🔥 make 🔥 the iron hot by striking! ⚡",
  "🎨 The best way to predict the future is to ✍️ create ✍️ it. 🌈",
  "🚶‍♂️ The journey of a thousand miles begins with a ✨ single ✨ step. 🏞️👣",
  "😊 Happiness is not something readymade. It comes from your own actions. 😄🌟",
  "❰❰ 🖤 𝐀ʟ𝐖ᴀ𝐘ꜱ 𝙺𝐈𝙽𝙶 𝐈𝗡 🆃🅷🅴 𝐆𝙰ₘₑ 💦 ❱❱",
  "😏 I am the Artist Who Paints My Life ✋"
];

let bioUpdateInterval = null; // ⏳ Store the interval ID ⏳

const autobio = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd !== "autobio") return;

  if (!sock.user?.id) {
    return await sock.sendMessage(m.from, {
      text: '🤖 Bot identity unavailable. Please try again later.'
    }, { quoted: m });
  }

  const updateBio = async () => {
    try {
      const timeLK = moment().tz('Asia/Colombo').format('HH:mm:ss');
      const quote = lifeQuotes[Math.floor(Math.random() * lifeQuotes.length)];
      const newBio = `✨ ${config.BOT_NAME} Active 🟢 | 🕰️ LK Time: ${timeLK} | 💬 ${quote}`;

      await sock.updateProfileStatus(newBio);
      console.log("✅ Bio updated:", newBio);
    } catch (err) {
      console.error("❌ Failed to update bio:", err);
    }
  };

  if (bioUpdateInterval) {
    clearInterval(bioUpdateInterval);
    bioUpdateInterval = null;

    await sock.sendMessage(m.from, {
      text: "🛑 *Auto Bio Update Stopped!*"
    }, {
      quoted: m,
      contextInfo: {
        externalAdReply: {
          title: `${config.BOT_NAME} - Bio Control`,
          body: "Powered by ArslanMD Official",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });

  } else {
    await updateBio();
    bioUpdateInterval = setInterval(updateBio, 60000); // every 60 sec

    await sock.sendMessage(m.from, {
      text: "✅ *Auto Bio Update Started!*\n🌟 Your bio will refresh every minute with a new quote.",
    }, {
      quoted: m,
      contextInfo: {
        externalAdReply: {
          title: `${config.BOT_NAME} - Auto Bio`,
          body: "Dynamic quotes every minute 💬",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  }
};

export default autobio;
