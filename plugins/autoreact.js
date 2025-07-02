import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const configPath = path.resolve('./config.cjs');

const autoreactCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // Only proceed if .autoreact command
  if (cmd !== 'autoreact') return;

  // Check if user is owner
  const ownerNumber = config.BOT.NUMBER;
  const senderNumber = m.sender;
  if (senderNumber !== ownerNumber) {
    await sock.sendMessage(m.from, {
      text: '*🚫 Only bot owner can toggle AUTO_REACT*'
    }, { quoted: m });
    return;
  }

  // Check for on/off argument
  if (!['on', 'off'].includes(text)) {
    await sock.sendMessage(m.from, {
      text: `🌩️ *Usage:*\n${prefix}autoreact on\n${prefix}autoreact off`
    }, { quoted: m });
    return;
  }

  // Update in-memory config
  config.AUTO.AUTO_REACT = text === 'on';

  // Update config.cjs on disk
  try {
    let configCode = fs.readFileSync(configPath, 'utf8');

    // Regex update: change AUTO_REACT default
    configCode = configCode.replace(
      /AUTO_REACT: process\.env\.AUTO_REACT !== undefined \? process\.env\.AUTO_REACT === 'false' : (true|false),/,
      `AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : ${text === 'on'},`
    );

    fs.writeFileSync(configPath, configCode, 'utf8');

    await sock.sendMessage(m.from, {
      text: `✅ AUTO_REACT is now *${text.toUpperCase()}*`
    }, { quoted: m });
  } catch (e) {
    console.error("❌ Error writing config.cjs:", e);
    await sock.sendMessage(m.from, {
      text: `❌ Failed to write config.cjs:\n${e.message}`
    }, { quoted: m });
  }
};

export default autoreactCommand;
