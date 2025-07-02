import config from '../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
  const command = "ping";
  if (!m.body.startsWith(prefix + command)) return;

  try {
    const start = new Date().getTime();

    // 🎲 Random emoji reaction
    const emojis = ['⚡', '🚀', '🔥', '💨', '💎', '🎉', '🌟', '🎯'];
    const reactEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await sock.sendMessage(m.from, { react: { text: reactEmoji, key: m.key } });

    // 🕒 Response time
    const tempMsg = await sock.sendMessage(m.from, { text: '🏓 Checking speed...' }, { quoted: m });
    const end = new Date().getTime();
    const pingTime = end - start;

    // 🧠 Speed status
    let speedLabel = '🐢 Slow', indicator = '🔴';
    if (pingTime <= 150) {
      speedLabel = '🚀 Super Fast'; indicator = '🟢';
    } else if (pingTime <= 300) {
      speedLabel = '⚡ Fast'; indicator = '🟡';
    } else if (pingTime <= 600) {
      speedLabel = '⏱️ Medium'; indicator = '🟠';
    }

    // ✅ Final Message
    await sock.sendMessage(m.from, {
      text: `🎯 *Pong!* ${pingTime}ms\n${indicator} *Speed:* ${speedLabel}\n🤖 *Bot:* ${config.BOT_NAME}\n👑 *Owner:* ${config.OWNER_NAME}\n🛠️ *Version:* ${config.VERSION || '2.0.0'}`,
      contextInfo: {
        forwardingScore: 100,
        isForwarded: true,
        externalAdReply: {
          title: `${config.BOT_NAME} - Ping Check`,
          body: "Powered by ArslanMD Official",
          mediaType: 1,
          previewType: "PHOTO",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: tempMsg });

  } catch (err) {
    console.error("❌ Error in ping command:", err);
    await sock.sendMessage(m.from, {
      text: "❌ Ping error: " + err.message
    }, { quoted: m });
  }
};

export default ping;
