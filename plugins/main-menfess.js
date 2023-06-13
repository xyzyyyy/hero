let handler = async(m, { conn, text, command, usedPrefix, isBotAdmin }) => {
  if (!text) throw `${set.sb} *Example* : ${usedPrefix + command} 62882008211320|hi, ayo balikan\n\nSimbol *|* untuk spasi`
  let [num, pesan] = text.split(/[|]/)
  let who = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  if (who == m.sender) throw 'Kirim menfess ke diri sendiri?\ngokil:v'
  m.react('✅')
  let sen = await conn.sendMessage(who, `*MENFESSIN!*\n\nHalo *${conn.getName(who)}* ada pesan kecil dari seseorang yang tidak ingin disebut namanya 😇\n\nPesan : `+ pesan + `\n\n_wajib gesek pesan ini / reply pesan ini kekanan untuk mengirim balasan confess_`, contextInfo: { mentionedJid: [m.sender]})
  if (m.isGroup && isBotAdmin) m.delete()
  if (sen) conn.reply(m.chat, `Sukses mengirim pesan rahasia ke ${m.isGroup ? conn.getName(who) : `@${parseInt(who)}`}`, m.isGroup ? null : m, { mentions: [who] })
  else throw 'Harap gunakan nomor yang valid!'
}
handler.help = ['menfess *BUG*']
handler.tags = ['main', 'fun']
handler.command = /^(menfess|menfes|confess|confes)$/i
module.exports = handler