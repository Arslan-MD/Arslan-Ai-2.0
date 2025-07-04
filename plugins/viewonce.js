import pkg from '@whiskeysockets/baileys';
const { downloadMediaMessage } = pkg;
import config from '../../config.cjs';

const viewOnceHandler = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : '';
  if (!['vv', 'vv2', 'vv3'].includes(cmd)) return;

  const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';

  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;

  if (!m.quoted) return m.reply("*Reply to a view once message.*");

  let msg = m.quoted.message;
  if (msg?.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message;
  else if (msg?.viewOnceMessage) msg = msg.viewOnceMessage.message;

  if (!msg) return m.reply("*This is not a view once message.*");

  if ((cmd === 'vv' || cmd === 'vv2' || cmd === 'vv3') && !isOwner && !isBot) {
    return m.reply("*Only the owner or bot can use this command.*");
  }

  try {
    const messageType = Object.keys(msg)[0];
    let buffer;

    if (messageType === 'audioMessage') {
      buffer = await downloadMediaMessage(m.quoted, 'buffer', {}, { type: 'audio' });
    } else {
      buffer = await downloadMediaMessage(m.quoted, 'buffer');
    }

    if (!buffer) return m.reply("*Failed to retrieve media.*");

    let caption = `🔓 *View Once Unlocked by ${config.BOT_NAME}*`;
    let recipient = m.from;

    if (cmd === 'vv2') recipient = botNumber;
    if (cmd === 'vv3') recipient = ownerNumber;

    if (messageType === 'imageMessage') {
      await sock.sendMessage(recipient, { image: buffer, caption }, { quoted: m });
    } else if (messageType === 'videoMessage') {
      await sock.sendMessage(recipient, { video: buffer, caption, mimetype: 'video/mp4' }, { quoted: m });
    } else if (messageType === 'audioMessage') {
      await sock.sendMessage(recipient, { audio: buffer, mimetype: msg.audioMessage.mimetype, ptt: true }, { quoted: m });
    } else {
      return m.reply("*Unsupported media type.*");
    }

    await sock.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("❌ VV Command Error:", error);
    await m.reply("*An error occurred while processing view once media.*");
    await sock.sendMessage(m.from, { react: { text: "❗", key: m.key } });
  }
};

export default viewOnceHandler;
