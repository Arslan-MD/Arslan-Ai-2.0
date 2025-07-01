const ping = async (sock, m, sender, text) => {
    await sock.sendMessage(m.key.remoteJid, {
        text: `🏓 Pong! Bot is alive, ${sender.split('@')[0]}`
    }, { quoted: m });
};

export default ping;
