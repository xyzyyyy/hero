let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
conn.reply( `62882008211320@s.whatsapp.net`, ` *ownerku ada yang memanggil kamu :v*`, m)

  conn.reply(m.chat, `
Jangan Tag Owner Ku Bang :)
`.trim(), m)
    let mentionedJid = [m.sender]
}
handler.customPrefix = /@62882008211320/i
handler.command = new RegExp

module.exports = handler