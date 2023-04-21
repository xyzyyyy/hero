let fs = require('fs')
let handler = async (m, { conn, text }) => {
    m.reply('Tunggu Sebentar, Proses Getting File database.json')
    let sesi = await fs.readFileSync('./rasel.db.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m })
}
handler.help = ['getdatabase']
handler.tags = ['owner']
handler.command = /^(getdb)$/i

handler.owner = true

module.exports = handler
