const xpperatm = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^narik|tarik/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].atm / xpperatm) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].atm >= xpperatm * count) {
    global.db.data.users[m.sender].atm -= xpperatm * count
    global.db.data.users[m.sender].money += count
    conn.reply(m.chat, `-Rp.${xpperatm * count} 💳\n+Rp.${count} 💹\n\n[ ! ] Succes menarik uang !`, m)
  } else conn.reply(m.chat, `[❗] Uang anda tidak mencukupi untuk menarik ${count} !`, m)
}
handler.help = ['pull <jumlah>']
handler.tags = ['rpg']
handler.command = /^pull ([0-9]+)|pull$/i

module.exports = handler
