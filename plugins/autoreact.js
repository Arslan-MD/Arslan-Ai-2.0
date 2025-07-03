import config from '../config.cjs';

const autoreactCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'autoreact') return;

  const sender = m.sender;
  const botNumber = config.BOT.NUMBER;
  const allowedUsers = [botNumber, config.BOT.SUDO].filter(Boolean);

  if (!allowedUsers.includes(sender)) {
    return await sock.sendMessage(m.from, {
      text: '*🚫 Only the bot owner or sudo can use this command!*'
    }, { quoted: m });
  }

  if (!['on', 'off'].includes(text)) {
    return await sock.sendMessage(m.from, {
      text: `🌩️ *Usage:*\n${prefix}autoreact on\n${prefix}autoreact off`
    }, { quoted: m });
  }

  config.AUTO.AUTO_REACT = text === 'on';

  return await sock.sendMessage(m.from, {
    image: { url: 'https://opengraph.githubassets.com/1/Arslan-MD/Arslan-Ai-2.0' },
    caption: `✅ *AUTO_REACT has been turned ${text.toUpperCase()}*\n\n🤖 *Bot:* ${config.BOT_NAME}\n👑 *Owner:* ${config.OWNER_NAME}\n📦 *Repo:* github.com/Arslan-MD/Arslan-Ai-2.0`,
    contextInfo: {
      forwardingScore: 100,
      isForwarded: true,
      externalAdReply: {
        title: `${config.BOT_NAME} - AutoReact`,
        body: "Powered by ArslanMD Official",
        mediaType: 1,
        previewType: "PHOTO",
        thumbnailUrl: 'https://opengraph.githubassets.com/1/Arslan-MD/Arslan-Ai-2.0',
        sourceUrl: 'https://github.com/Arslan-MD/Arslan-Ai-2.0'
      }
    }
  }, { quoted: m });
};

export default autoreactCommand;
