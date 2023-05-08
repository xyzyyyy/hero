const axios = require('axios');

let handler = async(m, { conn, usedPrefix, text }) => {
    if (!text) throw `Kamu mau nanya apa`
    try {
        const { data } = await axios.get("https://sh.xznsenpai.xyz/api/openai", {
            params: {
                text: text
            }
        })
        let hasil = `${data.result}`
        m.reply(hasil)
    } catch {
        throw `Terjadi kesalahan! Silahkan coba lagi.`
    }
}
handler.command = /^gpt30$/i
handler.help = ["gpt30"]
handler.tags = ["internet"]

module.exports = handler
