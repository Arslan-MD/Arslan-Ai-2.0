import config from '../config.cjs';

const ping = async (m, sock) => {
  try {
    if (!m.body.startsWith(config.PREFIX + "ping")) return;

    const start = new Date().getTime();
    const replyMsg = await sock.sendMessage(m.from, { text: '🏓 Checking...' }, { quoted: m });
    const end = new Date().getTime();
    const pingTime = end - start;

    await sock.sendMessage(m.from, {
      text: `🔰 *Pong!* Response in ${pingTime}ms\n🤖 Bot Name: ${config.BOT_NAME}\n🧑‍💻 Owner: ${config.OWNER_NAME}`
    }, { quoted: replyMsg });

  } catch (error) {
    console.error("❌ Error in .ping command:", error);
  }
};

export default ping;
