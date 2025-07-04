import config from '../config.cjs';

const sendWithLogo = async (m, sock) => {
  const prefix = config.PREFIX;
  const body = typeof m.body === 'string' ? m.body : '';
  const cmd = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'sendwithlogo') return;
  if (!text) return await sock.sendMessage(m.from, { text: 'Please provide a message to send with logo.' }, { quoted: m });

  await sock.sendMessage(m.from, {
    image: { url: 'https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/logo.png' },
    caption: `🖼️ *${config.BOT_NAME} Message:*\n\n${text}`,
    contextInfo: {
      forwardingScore: 100,
      isForwarded: true
    }
  }, { quoted: m });
};

export default sendWithLogo;
