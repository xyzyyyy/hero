let { googleImage } = require('@bochilteam/scraper')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Cewe Cantik`
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link,`
*ɢᴏᴏɢʟᴇ ɪᴍᴀɢᴇ*
🔎 *Result:* ${text}
🌎 *Source:* Google
`, 'google image', m)
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

module.exports = handler