let handler = async (m, { conn, text, usedPrefix, isOwner, command }) => {
    if(isNaN(text)) {
        var number = text.split`@`[1]
    } else if(!isNaN(text)) {
        var number = text
    }
    if(!text && !m.quoted) return conn.reply(m.chat, `Masukan nomor, tag target atau balas pesan target`, m)
    if(text) {
        var user = number + '@s.whatsapp.net'
    } else if(m.quoted.sender) {
        var user = m.quoted.sender
    } else if(m.mentionedJid) {
        var user = number + '@s.whatsapp.net'
        }
    let cocok = `${Math.floor(Math.random() * 100)} %`
    conn.reply(m.chat, `Kecocokan Anda Dengan Pasangan Anda
    
@${m.sender.split`@`[0]} dengan @${user.split('@')[0]} ${cocok}`, m, {mentions: [m.sender, user]})
}
handler.help = ['kalkulatorcinta', 'cocok']
handler.tags = ['fun']
handler.command = /^cocok|kalkulatorcinta$/i
handler.ban = true
handler.group = true

module.exports = handler
