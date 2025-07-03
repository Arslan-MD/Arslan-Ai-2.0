import dotenv from 'dotenv';
dotenv.config();

import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 30; // or even 50
import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import { File } from 'megajs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './config.cjs';
global.config = config;
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;
const prefix = process.env.PREFIX || config.PREFIX;
const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 3000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

async function downloadSessionData() {
    console.log("Debugging SESSION_ID:", config.SESSION_ID);

    if (!config.SESSION_ID) {
        console.error('❌ Please add your session to SESSION_ID env !!');
        return false;
    }

    const sessdata = config.SESSION_ID.split("ARSL~")[1];

    if (!sessdata || !sessdata.includes("#")) {
        console.error('❌ Invalid SESSION_ID format! It must contain both file ID and decryption key.');
        return false;
    }

    const [fileID, decryptKey] = sessdata.split("#");

    try {
        console.log("🔄 Downloading Session...");
        const file = File.fromURL(`https://mega.nz/file/${fileID}#${decryptKey}`);

        const data = await new Promise((resolve, reject) => {
            file.download((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        await fs.promises.writeFile(credsPath, data);
        console.log("🔒 Session Successfully Loaded !!");
        return true;
    } catch (error) {
        console.error('❌ Failed to download session data:', error);
        return false;
    }
}

async function start() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`🤖 Arslan-Ai-2.0 using WA v${version.join('.')}, isLatest: ${isLatest}`);

    const Matrix = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: useQR,
      browser: ["Arslan-Ai-2.0", "safari", "3.3"],
      auth: state,
      getMessage: async (key) => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id);
          return msg.message || undefined;
        }
        return { conversation: "Arslan ai whatsapp user bot" };
      }
    });

    // ✅ Save session on update
    Matrix.ev.on('creds.update', saveCreds);

    // ✅ Handle connection (open & reconnect)
    Matrix.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        const botNumber = Matrix.user.id;
        config.BOT.NUMBER = botNumber;
        config.BOT.SUDO = botNumber;
        console.log("🤖 Bot connected as:", botNumber);
        console.log("👑 Owner (label):", config.BOT.OWNER);
      }

      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        if (reason !== DisconnectReason.loggedOut) {
          console.log("🔁 Reconnecting...");
          start(); // reconnect
        } else {
          console.log("❌ Logged out.");
          start(); // force restart
        }
      }
    });

    // ✅ Set PUBLIC or PRIVATE mode
    if (config.MODE === "public") {
      Matrix.public = true;
      console.log("📢 Bot is in PUBLIC mode.");
    } else {
      Matrix.public = false;
      console.log("🔒 Bot is in PRIVATE mode.");
    }

    // 🔽 yahan baaki events aur plugin loader rahega...

  } catch (err) {
    console.error("❌ Failed to start bot:", err);
  }
}
    } else if (connection === 'open') {
        if (initialConnection) {
            console.log(chalk.green("Connected Successfully Arslan-Ai-2.0 🤍"));
            Matrix.sendMessage(Matrix.user.id, { 
                image: { url: "https://files.catbox.moe/2bhefn.png" }, 
                caption: `> 𝐂ᴏɴɴᴇᴄᴛᴇ𝐃 𝐒ᴜᴄᴄᴇꜱꜱꜰᴜʟʟ𝐘 🩷🎀 .
╭───❍「 *𝐂ᴏɴɴᴇᴄᴛᴇ𝐃 𝐁ᴏᴛ* 」
┃ ꧁𓊈𒆜🅰🆁🆂🅻🅰🅽-🅰🅸-2.0𒆜𓊉꧂🫧
╰───────────❍
╭───❍「 *𝐁ᴏᴛ 𝐖ᴇʙ 𝐏ᴀɢᴇ* 」
┃ [**Here**](https://arslanmdofficial.kesug.com/) visit web...!
╰───────────❍
╭───❍「 *𝐉ᴏɪɴ 𝐂ʜᴀɴɴᴇ𝐋* 」
┃ [**Here**](https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306) to join..!
╰───────────❍
╭───❍「 *𝐁ᴏᴛ 𝐎ᴡɴᴇ𝐑* 」
┃ 🅰🆁🆂🅻🅰🅽-🅰🅸
╰───────────❍
╭───❍「 *𝐒ʏꜱᴛᴇᴍ 𝐒ᴛᴀᴛᴜꜱ* 」
┃ ░░░░░░░░░░░░░░░░ 100%
╰───────────❍
╭───❍「 *𝐁ᴏᴛ 𝐏ʀᴇꜰɪ𝐱*」 
┃ 𝐂ᴏɴꜰɪɢᴜʀ𝐄 𝐘ᴏᴜʀ 𝐏ʀᴇꜰɪ𝐗 ${prefix}
╰───────────❍
╭─❍「 *𝐀ᴜᴛᴏᴍᴀᴛɪᴏ𝐍 𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ*」 
┃ 𝘼𝙧𝙨𝙡𝙖𝙣𝙈𝘿 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡☠️
╰───────────❍`
            });
            initialConnection = false;
        } else {
            console.log(chalk.blue("♻️ Connection reestablished after restart."));
        }
    }
});
        
        Matrix.ev.on('creds.update', saveCreds);

        Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];
                console.log(mek);
                if (!mek.key.fromMe && config.AUTO_REACT) {
                    console.log(mek);
                    if (mek.message) {
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                }
            } catch (err) {
                console.error('Error during auto reaction:', err);
            }
        });
        
        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0];
        const fromJid = mek.key.participant || mek.key.remoteJid;
        if (!mek || !mek.message) return;
        if (mek.key.fromMe) return;
        if (mek.message?.protocolMessage || mek.message?.ephemeralMessage || mek.message?.reactionMessage) return; 
        if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN) {
            await Matrix.readMessages([mek.key]);     
              //=============readstatus======= 
        if (config.READ_MESSAGE === 'true') {
    await conn.readMessages([mek.key]);  // Mark message as read
    console.log(`Marked message from ${mek.key.remoteJid} as read.`);
  }
        if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true"){
               const jawadlike = await conn.decodeJid(conn.user.id);
               const emojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '🎎', '🎏', '🎐', '⚽', '🧣', '🌿', '⛈️', '🌦️', '🌚', '🌝', '🙈', '🙉', '🦖', '🐤', '🎗️', '🥇', '👾', '🔫', '🐝', '🦋', '🍓', '🍫', '🍭', '🧁', '🧃', '🍿', '🍻', '🎀', '🧸', '👑', '〽️', '😳', '💀', '☠️', '👻', '🔥', '♥️', '👀', '🐼'];
               const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await conn.sendMessage(mek.key.remoteJid, {
      react: {
        text: randomEmoji,
        key: mek.key,
      } 
    }, { statusJidList: [mek.key.participant, jawadlike] });
  }        
          //=============readstatus=======                         
            if (config.AUTO_STATUS_REPLY) {
                const customMessage = config.STATUS_READ_MSG || '✅ Auto Status Seen Bot By ArslanMD Official';
                await Matrix.sendMessage(fromJid, { text: customMessage }, { quoted: mek });
            }
        }
    } catch (err) {
        console.error('Error handling messages.upsert event:', err);
    }
});

    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        console.log("🔒 Session file found, proceeding without QR code.");
        await start();
    } else {
        const sessionDownloaded = await downloadSessionData();
        if (sessionDownloaded) {
            console.log("🔒 Session downloaded, starting bot.");
            await start();
        } else {
            console.log("No session found or downloaded, QR code will be printed for authentication.");
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

