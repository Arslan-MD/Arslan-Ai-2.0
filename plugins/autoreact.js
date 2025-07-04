import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const CONFIG_PATH = path.resolve('./data/autoreact.json');

const autoreactCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'autoreact') return;

  const sender = m.sender;
  const allowedUsers = [config.BOT.OWNER_NUMBER, config.BOT.SUDO].filter(Boolean);

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

  // Update config file
  const newState = text === 'on';
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ enabled: newState }, null, 2));

  return await sock.sendMessage(m.from, {
    image: { url: 'https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/logo.png' },
    caption: `✅ *AUTO_REACT has been turned ${text.toUpperCase()}*\n\n🤖 *Bot:* ${config.BOT.NAME}\n👑 *Owner:* ${config.OWNER_NAME}\n📦 *Repo:* github.com/Arslan-MD/Arslan-Ai-2.0`,
    contextInfo: {
      forwardingScore: 100,
      isForwarded: true,
      externalAdReply: {
        title: `${config.BOT.NAME} - AutoReact`,
        body: "Powered by ArslanMD Official",
        mediaType: 1,
        previewType: "PHOTO",
        thumbnailUrl: 'https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/logo.png',
        sourceUrl: 'https://github.com/Arslan-MD/Arslan-Ai-2.0'
      }
    }
  }, { quoted: m });
};

export default autoreactCommand;
