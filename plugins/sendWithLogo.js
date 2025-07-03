const sendWithLogo = async (sock, jid, message, quoted = null) => {
  const githubLogo = 'https://opengraph.githubassets.com/1/Arslan-MD/Arslan-Ai-2.0';
  const finalMsg = {
    image: { url: githubLogo },
    caption: `${message.text || message.caption || '🛠️ Command Executed'}\n\n🔗 GitHub: https://github.com/Arslan-MD/Arslan-Ai-2.0`,
    contextInfo: {
      forwardingScore: 100,
      isForwarded: true
    }
  };
  return await sock.sendMessage(jid, finalMsg, { quoted });
};

export default sendWithLogo;
