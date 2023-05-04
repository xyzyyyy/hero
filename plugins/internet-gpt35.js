let { Configuration, OpenAIApi } = require("openai")
let handler = async (m, { conn, text }) => {
if (!text) return m.adreply("[!] Masukkan teks.")
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: text }],
            });
            m.reply(response.data.choices[0].message.content)
    }
handler.help = ['gpt35']
handler.tags = ['internet']
handler.command = /^(gpt35)$/i
module.exports = handler;
