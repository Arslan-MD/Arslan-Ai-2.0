import config from '../config.cjs';

const autoreactCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // Exit if not .autoreact
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

  await sock.sendMessage(m.from, {
    text: `✅ *AUTO_REACT has been turned ${text.toUpperCase()}*`
  }, { quoted: m });
};

export default autoreactCommand;
