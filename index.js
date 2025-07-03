import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import express from 'express';
import pino from 'pino';
import chalk from 'chalk';
import { File } from 'megajs';
import moment from 'moment-timezone';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 30;

import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from '@whiskeysockets/baileys';

import config from './config.cjs';
global.config = config;

import { Handler, Callupdate, GroupUpdate } from './data/index.js';
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;

const prefix = config.PREFIX;
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

let useQR = false;
let initialConnection = true;

if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

async function downloadSessionData() {
  console.log("Debugging SESSION_ID:", config.SESSION_ID);
  if (!config.SESSION_ID || !config.SESSION_ID.includes("ARSL~")) return false;

  const sessdata = config.SESSION_ID.split("ARSL~")[1];
  if (!sessdata.includes("#")) return false;
  const [fileID, decryptKey] = sessdata.split("#");

  try {
    const file = File.fromURL(`https://mega.nz/file/${fileID}#${decryptKey}`);
    const data = await new Promise((resolve, reject) => {
      file.download((err, d) => (err ? reject(err) : resolve(d)));
    });
    await fs.promises.writeFile(credsPath, data);
    console.log("🔒 Session Successfully Loaded !!");
    return true;
  } catch (e) {
    console.error('❌ Session download error:', e);
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
      getMessage: async (key) => ({ conversation: "Arslan ai whatsapp user bot" })
    });

    Matrix.ev.on('creds.update', saveCreds);

    Matrix.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
  if (connection === 'open') {
    config.BOT.NUMBER = Matrix.user.id;
    config.BOT.SUDO = Matrix.user.id;
    console.log("🤖 Bot connected as:", Matrix.user.id);
    console.log("👑 Owner (label):", config.BOT.OWNER);

    // ✅ Set mode PUBLIC or PRIVATE
    if (config.MODE === "public") {
      Matrix.public = true;
      console.log("📢 Bot is in PUBLIC mode.");
    } else {
      Matrix.public = false;
      console.log("🔒 Bot is in PRIVATE mode.");
    }

    // ✅ Optional: Notify owner on connect
    if (initialConnection) {
      await Matrix.sendMessage(Matrix.user.id, {
        text: `🤖 *Arslan-Ai-2.0 connected successfully!*\nMode: ${config.MODE.toUpperCase()}`
      });
      initialConnection = false;
    }

  } else if (connection === 'close') {
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

    // Public/private toggle
    Matrix.public = config.MODE === 'public';
    console.log(Matrix.public ? "📢 Public Mode Enabled" : "🔒 Private Mode Enabled");

    // ✅ Message Handler (auto react + commands)
    Matrix.ev.on("messages.upsert", async ({ messages }) => {
      const mek = messages[0];
      if (!mek.message || mek.key?.id?.startsWith("BAE5") || mek.key.fromMe) return;

      // Auto React
      if (config.AUTO.AUTO_REACT) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        await doReact(emoji, mek, Matrix);
      }

      // Only allow commands in public OR if owner in private
      const body = mek.message?.conversation || mek.message?.extendedTextMessage?.text || '';
      if (!body.startsWith(prefix)) return;

      const sender = mek.key.participant || mek.key.remoteJid;
      const isOwner = sender === config.BOT.NUMBER;
      if (!Matrix.public && !isOwner) return;

      try {
        await Handler({ messages: [mek] }, Matrix);
      } catch (err) {
        console.error("❌ Handler error:", err);
      }
    });

    Matrix.ev.on("call", json => Callupdate(json, Matrix));
    Matrix.ev.on("group-participants.update", update => GroupUpdate(Matrix, update));

  } catch (err) {
    console.error("❌ Start error:", err);
  }
}

async function init() {
  if (fs.existsSync(credsPath)) {
    console.log("🔒 Session found, skipping QR...");
    await start();
  } else {
    const success = await downloadSessionData();
    useQR = !success;
    await start();
  }
}

init();

app.get('/', (req, res) => res.send('Arslan-Ai-2.0 running...'));
app.listen(PORT, () => console.log(`🌐 Server listening on ${PORT}`));
