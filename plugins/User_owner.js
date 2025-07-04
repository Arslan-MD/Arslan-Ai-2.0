import config from '../config.cjs';

const userCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const command = "user";
  if (!m.body.startsWith(prefix + command)) return;

  try {
    const ownerNumber = config.OWNER_NUMBER;
    const ownerName = config.OWNER_NAME;

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD`;

    // 🔹 Send contact card (vCard)
    await sock.sendMessage(m.from, {
      contacts: {
        displayName: ownerName,
        contacts: [{ vcard }]
      }
    }, { quoted: m });

    // 🔹 Send user info with image
    await sock.sendMessage(m.from, {
      image: { url: 'https://files.catbox.moe/v1rf80.jpg' },
      caption: `
╭┈┈❍ 𝙰𝚁𝚂𝙻𝙰𝙽-𝙰𝙸-2.0 ❍
┊• *Here are the bot owner details*
┊• *𝙽𝙰𝙼𝙴* : ${ownerName}
┊• *𝙽𝚄𝙼𝙱𝙴𝚁*: ${ownerNumber}
┆• *𝚅𝙴𝚁𝚂𝙸𝙾𝙽*: ${config.VERSION || "2.0.0"}
╰┈┈┈┈┈┈┈⭘
> © Stay connected for updates.`,
      contextInfo: {
        mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "Arslan-Ai-2.0 User Info",
          body: "Bot powered by ArslanMD Official",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/logo.png",
          mediaType: 1,
          previewType: "PHOTO",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error("⚠️ Error in user command:", error);
    await sock.sendMessage(m.from, {
      text: `❌ An error occurred: ${error.message}`
    }, { quoted: m });
  }
};

export default userCommand;
