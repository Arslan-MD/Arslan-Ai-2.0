
const ping = async (Matrix, m) => {
    const start = new Date().getTime();
    await Matrix.sendMessage(m.from, { text: '🏓 Pinging...' }, { quoted: m });
    const end = new Date().getTime();
    const pingTime = end - start;

    const prefix = global.config.PREFIX || '.';

    await Matrix.sendMessage(m.from, {
        text: `*🏓 Pong!*\n\n⏱️ Response: *${pingTime}ms*\n🔖 Prefix: *${prefix}*`,
    }, { quoted: m });
};

export default ping;
