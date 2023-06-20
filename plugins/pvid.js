let handler = async(m, { conn }) => {
    if(!m.quoted) throw "silahkan reply videonya!"
    let dataVideo = { ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage }
    conn.relayMessage(m.chat, dataVideo, {})
}
handler.command = /^pvid$/i
handler.help = ['pvid']
handler.tags = ['info']
module.exports = handler
