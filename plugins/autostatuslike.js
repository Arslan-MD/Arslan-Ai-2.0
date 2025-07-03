import config from '../config.cjs';

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
    await Matrix.sendMessage(m.from, {
      text: "*📛 THIS IS AN OWNER COMMAND*"
    }, { quoted: m });
    return;
  }

  let responseText = '';
  if (text === 'on') {
    config.AUTO_STATUS_REACT = true;
    responseText = "✅ *AUTO LIKE STATUS has been ENABLED*";
  } else if (text === 'off') {
    config.AUTO_STATUS_REACT = false;
    responseText = "❌ *AUTO LIKE STATUS has been DISABLED*";
  } else {
    responseText = `🌩️ *Usage:*\n- ${prefix + cmd} on\n- ${prefix + cmd} off`;
  }

  await Matrix.sendMessage(m.from, {
    image: { url: 'https://opengraph.githubassets.com/1/Arslan-MD/Arslan-Ai-2.0' },
    caption: `${responseText}\n\n🤖 *Bot:* ${config.BOT_NAME}\n👑 *Owner:* ${config.OWNER_NAME}\n📦 *Repo:* github.com/Arslan-MD/Arslan-Ai-2.0`,
    contextInfo: {
      forwardingScore: 100,
      isForwarded: true,
      externalAdReply: {
        title: `${config.BOT_NAME} - AutoStatusLike`,
        body: "Powered by ArslanMD Official",
        mediaType: 1,
        previewType: "PHOTO",
        thumbnailUrl: 'https://opengraph.githubassets.com/1/Arslan-MD/Arslan-Ai-2.0',
        sourceUrl: 'https://github.com/Arslan-MD/Arslan-Ai-2.0'
      }
    }
  }, { quoted: m });
};

export default autolikeCommand;
