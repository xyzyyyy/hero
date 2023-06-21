let handler = async(m, { conn, usedPrefix, text }) => {
    if (!text) throw `Kamu mau nanya apa?`
let api = await fetch(`https://xzn.wtf/api/openai?text=${text}&apikey=ryhar`)
        let hasil = await api.json()
        m.reply(hasil.result)
        }
handler.command = /^ai$/i
handler.help = ["ai"]
handler.tags = ["internet"]

module.exports = handler