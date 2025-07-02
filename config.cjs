const fs = require("fs");
require("dotenv").config();

const config = {
  VERSION: "2.0.0", // ⬅️ Add this line at the top or bottom

  SESSION_ID: process.env.SESSION_ID || "ARSL~E2sBgKiI#YcHiFWxnIebf_Xkwgc-8zVdYBPTXaShKfoDpDtcz3ZA",
  PREFIX: process.env.PREFIX || '.',
  BOT_NAME: process.env.BOT_NAME || "<| Arslan-Ai-2.0 𝐕❷🫧",
  BOT: process.env.BOT || "hello 👋",
  NEW_CMD: process.env.NEW_CMD || "ᴀᴅᴅᴠᴀʀ\n│ sᴜᴅᴏ\n| bright",
  CAPTION: process.env.CAPTION || "> *© Powered By ArslanMD Official💸*",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true,
  AUTO_BIO: process.env.AUTO_BIO !== undefined ? process.env.AUTO_BIO === 'true' : true,
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT !== undefined ? process.env.AUTO_STATUS_REACT === 'false' : true,
  ANTI_LEFT: process.env.ANTI_LEFT !== undefined ? process.env.ANTI_LEFT === 'true' : true,
  AUTOLIKE_EMOJI: process.env.AUTOLIKE_EMOJI || '💚',
  AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS !== undefined ? process.env.AUTO_REPLY_STATUS === 'false' : false,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || 'Status Viewed by Arslan-MD Powerfull Whatsapp Bot',
  VOICE_CHAT_BOT: process.env.VOICE_CHAT_BOT !== undefined ? process.env.VOICE_CHAT_BOT === 'true' : false,
  ANTILINK: process.env.ANTILINK !== undefined ? process.env.ANTILINK === 'false' : false,
  AUTO_STICKER: process.env.AUTO_STICKER !== undefined ? process.env.AUTO_STICKER === 'false' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'false' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'false' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'false' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : false,
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'false' : true,
  ANTI_DELETE: process.env.ANTI_DELETE !== undefined ? process.env.ANTI_DELETE === 'true' : false,
  CHAT_BOT: process.env.CHAT_BOT !== undefined ? process.env.CHAT_BOT === 'true' : false,
  CHAT_BOT_MODE: process.env.CHAT_BOT_MODE || "public",
  LYDEA: process.env.LYDEA !== undefined ? process.env.LYDEA === 'true' : false,
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'false' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  DELETED_MESSAGES_CHAT_ID: process.env.DELETED_MESSAGES_CHAT_ID || "923237045919@s.whatsapp.net",
  OWNER_NAME: process.env.OWNER_NAME || "<| ArslanMD Official 🫧",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "923237045919",
  SUDO_NUMBER: process.env.SUDO_NUMBER || "923237045919",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false,
  STATUS: process.env.STATUS !== undefined ? process.env.STATUS === 'true' : false,
  DEPLOY_DATE: process.env.DEPLOY_DATE || "2025-07-01",
  TARGET_NUMBER: process.env.TARGET_NUMBER || "923237045919"
};

module.exports = config;
