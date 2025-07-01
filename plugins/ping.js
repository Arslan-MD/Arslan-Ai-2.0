// File: plugins/ping.js

export default async function ping(m, sock) {
  try {
    await sock.sendMessage(
      m.from,
      { text: `🏓 Pong! Bot is Alive ✅` },
      { quoted: m }
    );
  } catch (err) {
    console.error("❌ Ping command failed:", err);
  }
}
