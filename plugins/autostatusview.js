import config from '../config.cjs'; // ✅ relative path from plugins folder

const autostatusCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const [cmd, ...args] = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(/\s+/) : [''];
  const text = args.join(' ').trim().toLowerCase();

  const validCommands = ['autostatus', 'autosview', 'autostatusview'];

  if (!validCommands.includes(cmd)) return;

  if (!isCreator) {
    await Matrix.sendMessage(m.from, { text: "*📛 THIS IS AN OWNER COMMAND*" }, { quoted: m });
    return;
  }

  let responseMessage = '';
  let updatedConfig = false;

  if (text === 'on') {
    config.AUTO_STATUS_SEEN = true;
    updatedConfig = true;
    responseMessage = "✅ AUTO STATUS SEEN has been enabled.";
  } else if (text === 'off') {
    config.AUTO_STATUS_SEEN = false;
    updatedConfig = true;
    responseMessage = "❌ AUTO STATUS SEEN has been disabled.";
  } else {
    responseMessage = `🌩️ Usage:\n- *${prefix + cmd} on:* Enable AUTO STATUS SEEN\n- *${prefix + cmd} off:* Disable AUTO STATUS SEEN`;
  }

  await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });

  if (updatedConfig) {
    console.log("⚙️ AUTO_STATUS_SEEN updated to:", config.AUTO_STATUS_SEEN);
  }
};

export default autostatusCommand;
