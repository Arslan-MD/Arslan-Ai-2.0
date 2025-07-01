const ping = async (sock, m, sender, text) => {
    try {
        const jid = m?.key?.remoteJid || sender;
        await sock.sendMessage(jid, {
            text: `🏓 Pong! Bot is alive, ${sender.split('@')[0]} ✅`
        }, { quoted: m });
    } catch (err) {
        console.error("❌ Ping command error:", err);
    }
};

export const command = ['ping'];
export const handler = ping;
