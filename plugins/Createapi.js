import config from '../config.cjs';

const createApiCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const q = m.body.slice(prefix.length + cmd.length).trim();

  if (!['createapi', 'makeapi', 'apimaker'].includes(cmd)) return;

  if (!q) {
    return await sock.sendMessage(m.from, {
      text: `*🌐 API CREATOR GUIDE*

🔹 Usage: .createapi <METHOD> <ENDPOINT> <RESPONSE_TYPE>

📌 *Examples:*
.createapi GET /users json
.createapi POST /create-user json
.createapi PUT /update-product json

📝 *Parameters:*
- METHOD: GET, POST, PUT, DELETE
- ENDPOINT: Must start with '/'
- RESPONSE_TYPE: json, text, xml`
    }, { quoted: m });
  }

  const parts = q.split(/\s+/);
  if (parts.length < 3) {
    return sock.sendMessage(m.from, { text: "⚠️ *Invalid format!* Use: `.createapi <METHOD> <ENDPOINT> <RESPONSE_TYPE>`" }, { quoted: m });
  }

  const [method, endpoint, responseType] = parts;
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  const validResponseTypes = ['json', 'text', 'xml'];

  if (!validMethods.includes(method.toUpperCase())) {
    return await sock.sendMessage(m.from, { text: `⚠️ *Invalid method!* Choose from: ${validMethods.join(', ')}` }, { quoted: m });
  }

  if (!endpoint.startsWith('/')) {
    return await sock.sendMessage(m.from, { text: "⚠️ *Endpoint must start with '/'* (e.g., `/users`)" }, { quoted: m });
  }

  if (!validResponseTypes.includes(responseType.toLowerCase())) {
    return await sock.sendMessage(m.from, { text: `⚠️ *Invalid response type!* Choose from: ${validResponseTypes.join(', ')}` }, { quoted: m });
  }

  const apiStructure = {
    method: method.toUpperCase(),
    endpoint: endpoint,
    responseType: responseType.toLowerCase(),
    createdAt: new Date().toISOString(),
    status: "draft"
  };

  const responseTemplates = {
    json: { status: true, message: "API endpoint created successfully", data: {} },
    text: "API endpoint created successfully",
    xml: `<?xml version="1.0" encoding="UTF-8"?><api><status>true</status><message>API endpoint created successfully</message></api>`
  };

  const responseTemplate = responseTemplates[responseType.toLowerCase()];

  const apiCode = `
// ${apiStructure.method} ${apiStructure.endpoint}
app.${apiStructure.method.toLowerCase()}('${apiStructure.endpoint}', (req, res) => {
  try {
    // Your API logic here
    res.${apiStructure.responseType}(${JSON.stringify(responseTemplate, null, 2)});
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});
`;

  await sock.sendMessage(m.from, {
    text: `*🌐 API ENDPOINT CREATED*

📍 Method: *${apiStructure.method}*
🔗 Endpoint: *${apiStructure.endpoint}*
📦 Response Type: *${apiStructure.responseType}*
⏰ Created: *${apiStructure.createdAt}*

*📝 Sample Implementation:*
\`\`\`javascript
${apiCode}
\`\`\`

*📋 Sample Response:*
\`\`\`${apiStructure.responseType}
${typeof responseTemplate === "string" ? responseTemplate : JSON.stringify(responseTemplate, null, 2)}
\`\`\`
`,
    contextInfo: {
      forwardingScore: 100,
      isForwarded: true,
      externalAdReply: {
        title: "Arslan-Ai API Builder",
        body: "Create fake API endpoints easily",
        mediaType: 1,
        previewType: "PHOTO",
        thumbnailUrl: "https://raw.githubusercontent.com/Arslan-MD/Arslan-Ai-2.0/V-2/media/menu.jpg",
        sourceUrl: "https://github.com/Arslan-MD/Arslan-Ai-2.0"
      }
    }
  }, { quoted: m });
};

export default createApiCommand;
