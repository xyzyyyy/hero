let handler = (m, { text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  let str = `
╭─────[ *NOW AFK !* ]──────✧
┆ *Nama* : ${conn.getName(m.sender)}
┆ *Alasan* : ${text ? '' + text : ''}
╰┅────────────────────★
`.trim()
m.reply(str)
}
handler.help = ['afk <alasan>']
handler.tags = ['group']
handler.command = /^afk$/i

module.exports = handler