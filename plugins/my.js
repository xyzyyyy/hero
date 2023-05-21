let handler = async(m, { conn }) => {

    let who

    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender

    else who = m.sender

    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam database'

let locale = 'id'

let d = new Date(new Date + 3600000)

let date = d.toLocaleDateString(locale, {

      day: 'numeric',

      month: 'long',

      year: 'numeric'

    })

let { name, limit, exp, level, money, atm } = global.db.data.users[who]

let text = `*•━━━ ❮❮ P R O F I L E ❯❯ ━━━•*

⌬ ❯❯ Nama = *${name}*
⌬ ❯❯ Limit = *${limit}*
⌬ ❯❯ Exp = *${exp}*
⌬ ❯❯ Level = *${level}*
⌬ ❯❯ Money = *${money}*
⌬ ❯❯ ATM = *${atm}*`

conn.sendMessage(m.chat, {

text: text,

contextInfo: {

externalAdReply: {

title: date,

body: 'bodynya',

thumbnailUrl: "https://telegra.ph/file/b0112a95e8d2eb2aaeab9.jpg",

sourceUrl: "https://chat.whatsapp.com/KZwneZawhyx5udc2XzUe7W",

mediaType: 1,

renderLargerThumbnail: true

}}}, { quoted: m})

}

handler.help = ['my [@user]']

handler.tags = ['xp']

handler.command = /^(my)$/i

module.exports = handler
