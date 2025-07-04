import axios from 'axios';
import config from '../config.cjs';

const aiCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const body = m.body || '';
  const cmd = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + cmd.length).trim();

  const aliases = {
    ai: {
      api: `https://lance-frank-asta.onrender.com/api/gpt?q=`,
      label: '🤖 AI'
    },
    bot: { api: `https://lance-frank-asta.onrender.com/api/gpt?q=`, label: '🤖 AI' },
    dj: { api: `https://lance-frank-asta.onrender.com/api/gpt?q=`, label: '🤖 AI' },
    gpt: { api: `https://lance-frank-asta.onrender.com/api/gpt?q=`, label: '🤖 AI' },
    gpt4: { api: `https://lance-frank-asta.onrender.com/api/gpt?q=`, label: '🤖 AI' },
    bing: { api: `https://lance-frank-asta.onrender.com/api/gpt?q=`, label: '🤖 AI' },

    openai: {
      api: `https://vapis.my.id/api/openai?q=`,
      label: '🧠 OpenAI'
    },
    chatgpt: { api: `https://vapis.my.id/api/openai?q=`, label: '🧠 OpenAI' },
    gpt3: { api: `https://vapis.my.id/api/openai?q=`, label: '🧠 OpenAI' },
    'open-gpt': { api: `https://vapis.my.id/api/openai?q=`, label: '🧠 OpenAI' },

    deepseek: {
      api: `https://api.ryzendesu.vip/api/ai/deepseek?text=`,
      label: '🧠 DeepSeek AI'
    },
    deep: { api: `https://api.ryzendesu.vip/api/ai/deepseek?text=`, label: '🧠 DeepSeek AI' },
    seekai: { api: `https://api.ryzendesu.vip/api/ai/deepseek?text=`, label: '🧠 DeepSeek AI' },
  };

  if (!Object.keys(aliases).includes(cmd)) return;
  if (!text) {
    return await Matrix.sendMessage(m.from, { text: `❓ Please provide a message.\nExample: *${prefix}${cmd} Hello*` }, { quoted: m });
  }

  try {
    const apiInfo = aliases[cmd];
    const url = apiInfo.api + encodeURIComponent(text);
    const { data } = await axios.get(url);

    const response = data.message || data.result || data.answer;
    if (!response) {
      return await Matrix.sendMessage(m.from, { text: "⚠️ AI failed to respond. Try again later." }, { quoted: m });
    }

    await Matrix.sendMessage(m.from, {
      text: `${apiInfo.label} *Response:*\n\n${response}`,
      contextInfo: {
        forwardingScore: 100,
        isForwarded: true,
        externalAdReply: {
          title: `${config.BOT_NAME} - AI Response`,
          body: "Powered by ArslanMD Official",
          thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/main/media/logo.jpg",
          mediaType: 1,
          previewType: "PHOTO",
          sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
        }
      }
    }, { quoted: m });
  } catch (err) {
    console.error(`❌ AI Error (${cmd}):`, err);
    await Matrix.sendMessage(m.from, {
      text: "❌ AI error: " + err.message
    }, { quoted: m });
  }
};

export default aiCommand;
