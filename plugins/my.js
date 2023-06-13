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

let { name, limit, exp, level, money, atm, role, pasangan } = global.db.data.users[who]
let jodoh = `Berpacaran Dengan @${pasangan.split`@`[0]}`
let text = `*•━━━ ❮❮ P R O F I L E ❯❯ ━━━•*

⌬ ❯❯ Nama = *${name}*
⌬ ❯❯ Limit = *${limit}*
⌬ ❯❯ Exp = *${exp}*
⌬ ❯❯ Level = *${level}*
⌬ ❯❯ Money = *${money}*
⌬ ❯❯ ATM = *${atm}*
⌬ ❯❯ RANK = *${role}*
⌬ ❯❯ Status: ${pasangan ? jodoh : 'Awokwok Jomblo' }`.trim()

conn.reply(m.chat, text, m, { mentions: conn.parseMention(text) })

}

handler.help = ['my [@user] *BUG*']

handler.tags = ['xp']


handler.command = /^(my)$/i
module.exports = handler