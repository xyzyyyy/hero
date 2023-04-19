let instagramGetUrl = require('instagram-url-direct')
let handler = async (m, { conn, args, usedPrefix, command }) => {
m.react(global.tunggu)
    if (!args[0]) return m.reply(`*Masukan URL Instagram/Facebook nya!`)
    const results = (await instagramGetUrl(args[0])).url_list[0]

m.react(global.done)
    conn.sendFile(m.chat, results, 'ig.mp4', set.sukses, m)
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(Instagram|ig|igdl|facebook|fb|fbdl)$/i
handler.limit = true

module.exports = handler
