const axios = require('axios');

let handler = async(m, { conn, usedPrefix, text }) => {
    if (!text) throw `Kamu mau nanya apa`
        const { data } = await axios.get("https://xzn.wtf/api/openai?text=${text}&apikey=ryhar")
        let hasil = `${data.result}`
        m.reply(hasil)
        }
handler.command = /^ai$/i
handler.help = ["ai"]
handler.tags = ["internet"]

module.exports = handler
