import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const configPath = path.resolve('./config.cjs');

const autoreactCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'autoreact') return;

  if (!isCreator) {
    return await Matrix.sendMessage(m.from, {
      text: "*📛 THIS IS AN OWNER COMMAND*"
    }, { quoted: m });
  }

  if (!['on','off'].includes(text)) {
    return await Matrix.sendMessage(m.from, {
      text: `🌩️ Usage:\n${prefix}autoreact on\n${prefix}autoreact off`
    }, { quoted: m });
  }

  const value = (text === 'on');
  config.AUTO_REACT = value;

  try {
    let content = fs.readFileSync(configPath, 'utf8');
    content = content.replace(
      /AUTO_REACT: process\.env\.AUTO_REACT !== undefined \? process\.env\.AUTO_REACT === 'false' : (true|false),/,
      `AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : ${value},`
    );
    fs.writeFileSync(configPath, content, 'utf8');
    await Matrix.sendMessage(m.from, {
      text: `✅ AUTO_REACT turned *${text.toUpperCase()}*`
    }, { quoted: m });
  } catch (e) {
    console.error('Error writing config.cjs', e);
    await Matrix.sendMessage(m.from, {
      text: '❌ Failed to write config.cjs'
    }, { quoted: m });
  }
};

export default autoreactCommand;
