import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // 🔄 Valid chatbot toggler commands
  const validCommands = ['chatbot', 'lydea', 'lydia', 'bot', 'automreply'];

  if (!validCommands.includes(cmd)) return;

  if (!isCreator) {
    return await Matrix.sendMessage(m.from, {
      text: "*👺 ᴛʜɪꜱ ɪꜱ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ*"
    }, { quoted: m });
  }

  let responseMessage = "";

  if (text === 'on') {
    config.CHAT_BOT = true;
    responseMessage = `✅ *${cmd.toUpperCase()} ENABLED!*\n🤖 Chatbot is now active.`;
  } else if (text === 'off') {
    config.CHAT_BOT = false;
    responseMessage = `❌ *${cmd.toUpperCase()} DISABLED!*\n🤖 Chatbot has been turned off.`;
  } else {
    responseMessage = `🌩️ *Usage:*\n- ${prefix + cmd} on\n- ${prefix + cmd} off`;
  }

  await Matrix.sendMessage(m.from, {
    text: responseMessage,
    contextInfo: {
      externalAdReply: {
        title: `${config.BOT_NAME} - ChatBot Toggle`,
        body: `Managed by ${config.OWNER_NAME}`,
        thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
        sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

export default autotypingCommand;
