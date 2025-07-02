import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const configPath = path.resolve('./config.cjs');

const autoreactCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const command = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + command.length).trim().toLowerCase();

  if (command !== 'autoreact') return;

  // ✅ Owner + Sudo check
  const sender = m.sender;
  const allowed = [
    config.OWNER_NUMBER,
    ...(config.SUDO_NUMBER?.split(',') || [])
  ].map(num => num.replace(/\D/g, '') + '@s.whatsapp.net');

  if (!allowed.includes(sender)) {
    return await sock.sendMessage(m.from, {
      text: '🚫 *This command is only for the bot owner or sudo users.*'
    }, { quoted: m });
  }

  // ✅ Invalid usage check
  if (!['on', 'off'].includes(args)) {
    return await sock.sendMessage(m.from, {
      text: `❗ Usage:\n${prefix}autoreact on\n${prefix}autoreact off`
    }, { quoted: m });
  }

  const newValue = (args === 'on');

  // ✅ Update runtime config
  config.AUTO_REACT = newValue;

  // ✅ Update config.cjs file
  try {
    let content = fs.readFileSync(configPath, 'utf-8');
    content = content.replace(
      /AUTO_REACT: process\.env\.AUTO_REACT !== undefined \? process\.env\.AUTO_REACT === 'false' : (true|false),/,
      `AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : ${newValue},`
    );
    fs.writeFileSync(configPath, content, 'utf-8');

    await sock.sendMessage(m.from, {
      text: `✅ *AUTO_REACT has been turned ${args.toUpperCase()}*`
    }, { quoted: m });
  } catch (err) {
    console.error('❌ Error updating config.cjs:', err);
    await sock.sendMessage(m.from, {
      text: '⚠️ Failed to update config file.'
    }, { quoted: m });
  }
};

export default autoreactCommand;
