import config from '../config.cjs'; // ✅ Correct relative path

const autolikeCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;

  const [cmd, ...args] = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).trim().split(/\s+/)
    : [''];
  const text = args.join(' ').toLowerCase();

  const validCommands = ['autolike', 'autoslike', 'autostatuslike'];

  if (!validCommands.includes(cmd)) return;

  if (!isCreator) {
    await Matrix.sendMessage(m.from, { text: "*📛 THIS IS AN OWNER COMMAND*" }, { quoted: m });
    return;
  }

  let responseMessage = '';

  if (text === 'on') {
    config.AUTO_STATUS_REACT = true;
    responseMessage = "✅ AUTO LIKE STATUS has been enabled.";
  } else if (text === 'off') {
    config.AUTO_STATUS_REACT = false;
    responseMessage = "❌ AUTO LIKE STATUS has been disabled.";
  } else {
    responseMessage = `🌩️ Usage:\n- *${prefix + cmd} on*: Enable\n- *${prefix + cmd} off*: Disable`;
  }

  await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
};

export default autolikeCommand;
