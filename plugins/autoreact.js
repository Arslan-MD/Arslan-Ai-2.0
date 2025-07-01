import fs from 'fs';
import path from 'path';
import config from '../../config.cjs';

const __dirname = path.resolve();
const configPath = path.join(__dirname, 'src', 'config.cjs');

const autoreactCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'autoreact') {
    if (!isCreator) {
      await Matrix.sendMessage(m.from, { text: "*📛 THIS IS AN OWNER COMMAND*" }, { quoted: m });
      return;
    }

    let responseMessage = '';
    if (text === 'on' || text === 'off') {
      const value = text === 'on';
      config.AUTO_REACT = value;

      try {
        // Update AUTO_REACT value in config.cjs
        const content = fs.readFileSync(configPath, 'utf-8');
        const updatedContent = content.replace(/AUTO_REACT: process\.env\.AUTO_REACT !== undefined \? process\.env\.AUTO_REACT === 'false' : (true|false),/, 
          `AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : ${value},`);

        fs.writeFileSync(configPath, updatedContent, 'utf-8');
        responseMessage = `✅ AUTO_REACT has been turned *${text.toUpperCase()}*.`;
      } catch (err) {
        console.error('Error updating config.cjs:', err);
        responseMessage = '❌ Failed to update AUTO_REACT in config.';
      }
    } else {
      responseMessage = "🌩️ Usage:\n- `.autoreact on`: Enable\n- `.autoreact off`: Disable";
    }

    await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
  }
};

export default autoreactCommand;
