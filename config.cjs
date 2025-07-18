const fs = require('fs');
require('dotenv').config();
console.log("✅ Arslan-Ai-2.0 config loaded...");

const config = {
  VERSION: process.env.BOT_VERSION || "2.0.0",
  DEPLOY_DATE: process.env.DEPLOY_DATE || new Date().toISOString().split('T')[0],
  SESSION_ID: process.env.SESSION_ID || "ARSL~a05mzRxD#Y8_pd03tvK7_lDH0e0WlxQ0Y_XsJcfIihCRXtCcEy4k",
  PREFIX: process.env.PREFIX || '.',
  MODE: "public",
  CRON_JOB: process.env.CRON_JOB || "0 */4 * * *",

  BOT: {
    NAME: process.env.BOT_NAME || "Arslan-Ai-2.0",
    STATUS: process.env.BOT_STATUS || "🤖 Online | !help",
    CAPTION: process.env.CAPTION || "> *© Powered By Arslan-Ai-2.0*",
    NEW_CMD: process.env.NEW_CMD || "ᴀᴅᴅᴠᴀʀ\n│ sᴜᴅᴏ\n| bright",
    OWNER_NAME: "ArslanMD Official",
    OWNER_NUMBER: "923237045919",
    SUDO: "923237045919",
    TARGET: formatNumber(process.env.TARGET_NUMBER || "923237045919")
  },

  AUTO: {
    READ: parseBool(process.env.AUTO_READ, true),
    AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
    REACT_EMOJI: process.env.AUTOLIKE_EMOJI || '💚',
    TYPING: parseBool(process.env.AUTO_TYPING, false),
    RECORDING: parseBool(process.env.AUTO_RECORDING, false),
    STATUS_SEEN: parseBool(process.env.AUTO_STATUS_SEEN, true),
    STATUS_REACT: parseBool(process.env.AUTO_STATUS_REACT, true),
    STATUS_REPLY: parseBool(process.env.AUTO_REPLY_STATUS, false),
    STATUS_MSG: process.env.STATUS_READ_MSG || 'Status Viewed by ArslanMD Official',
    BIO: parseBool(process.env.AUTO_BIO, true),
    ONLINE: parseBool(process.env.ALWAYS_ONLINE, false),
    STICKER: parseBool(process.env.AUTO_STICKER, true),
    VOICE_REPLY: parseBool(process.env.VOICE_CHAT_BOT, false),
    WELCOME: parseBool(process.env.WELCOME, true),
    WELCOME_MSG: process.env.WELCOME_MSG || "👋 Welcome {user} to {group}!",
    GOODBYE: parseBool(process.env.GOODBYE, true),
    GOODBYE_MSG: process.env.GOODBYE_MSG || "😢 Goodbye {user}!"
  },

  SECURITY: {
    ANTI_DELETE: parseBool(process.env.ANTI_DELETE, true),
    DELETE_LOG: formatNumber(process.env.DELETED_MESSAGES_CHAT_ID || "923237045919"),
    ANTI_LINK: parseBool(process.env.ANTILINK, true),
    ANTI_LEFT: parseBool(process.env.ANTI_LEFT, true),
    BLOCK_NON_ALLOWED: parseBool(process.env.NOT_ALLOW, true),
    REJECT_CALL: parseBool(process.env.REJECT_CALL, true),
    BLOCK_BOTS: parseBool(process.env.AUTO_BLOCK, true)
  },

  AI: {
    CHATBOT: parseBool(process.env.CHAT_BOT, true),
    CHATBOT_MODE: process.env.CHAT_BOT_MODE || "public",
    LYDEA: parseBool(process.env.LYDEA, true),
    GEMINI: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
    OPENAI: process.env.OPENAI_KEY || "",
    BRAINSHOP: process.env.BRAINSHOP_KEY || ""
  },

  DOWNLOAD: {
    YOUTUBE: {
      ENABLED: true,
      API_KEY: process.env.YT_API_KEY || ""
    },
    TIKTOK: {
      ENABLED: true,
      API: process.env.TIKTOK_API || ""
    },
    INSTAGRAM: {
      ENABLED: true
    }
  },

  DATABASE: {
    ENABLED: false,
    URL: process.env.MONGODB_URI || "",
    NAME: process.env.DB_NAME || "arslan_md"
  },

  DEBUG: {
    LOGS: parseBool(process.env.DEBUG_LOGS, false),
    ERROR_TRACE: parseBool(process.env.ERROR_TRACE, false),
    PERFORMANCE: parseBool(process.env.PERF_MONITOR, false)
  }
};

// ✅ ADD THESE LINES AT END — after config definition
config.OWNER_NAME = config.BOT.OWNER_NAME;
config.OWNER_NUMBER = config.BOT.OWNER_NUMBER;

function formatNumber(number) {
  if (!number) return "";
  return number.replace(/\D/g, "") + "@s.whatsapp.net";
}

function parseBool(value, defaultValue) {
  if (value === undefined) return defaultValue;
  return value === "true" || value === true;
}

module.exports = config;

