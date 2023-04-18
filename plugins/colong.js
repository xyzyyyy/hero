let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
  if (!isOwner) throw false
  try {
  	m.react(global.tunggu)
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
  } finally {
  	m.react(global.done)
    if (sel) await conn.sendSticker(m.chat, sel, m, { packname: 'MySticker', author: 'RahardiyanXD' })
    else throw false //return conn.reply(m.chat, `Balas stikernya boss ðŸ”¥`, m) 
  }
}
handler.help = ['colong <reply sticker>']
handler.tags = ['owner']
handler.command = /^(colong|ambil|cl4im|punyaku)$/i

module.exports = handler