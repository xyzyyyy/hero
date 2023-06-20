let handler = async (m, { conn, usedPrefix }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastmancings)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers) 
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    if (global.db.data.users[m.sender].fishingrod > 0 ) {
    if (new Date - global.db.data.users[m.sender].lastfishing > 3600000) {
		let randomaku1 = `${Math.floor(Math.random() * 5)}`
		let randomaku2 = `${Math.floor(Math.random() * 5)}`
		let randomaku4 = `${Math.floor(Math.random() * 5)}`
		let randomaku3 = `${Math.floor(Math.random() * 5)}`
		let randomaku5 = `${Math.floor(Math.random() * 5)}`
		let randomaku6 = `${Math.floor(Math.random() * 5)}`
		let randomaku7 = `${Math.floor(Math.random() * 5)}`
		let randomaku8 = `${Math.floor(Math.random() * 5)}`
		let randomaku9 = `${Math.floor(Math.random() * 5)}`
		let randomaku10 = `${Math.floor(Math.random() * 5)}`
		let randomaku11 = `${Math.floor(Math.random() * 5)}`
			.trim()

		let rbrb1 = (randomaku1 * 1)
		let rbrb2 = (randomaku2 * 1)
		let rbrb3 = (randomaku3 * 1)
		let rbrb4 = (randomaku4 * 1)
		let rbrb5 = (randomaku5 * 1)
		let rbrb6 = (randomaku6 * 1)
		let rbrb7 = (randomaku7 * 1)
		let rbrb8 = (randomaku8 * 1)
		let rbrb9 = (randomaku9 * 1)
		let rbrb10 = (randomaku10 * 1)
		let rbrb11 = (randomaku11 * 1)
		

		let anti1 = `${rbrb1}`
		let anti2 = `${rbrb2}`
		let anti3 = `${rbrb3}`
		let anti4 = `${rbrb4}`
		let anti5 = `${rbrb5}`
		let anti6 = `${rbrb6}`
		let anti7 = `${rbrb7}`
		let anti8 = `${rbrb8}`
		let anti9 = `${rbrb9}`
		let anti10 = `${rbrb10}`
		let anti11 = `${rbrb11}`
           
		let hsl = `   
*📮Hasil tangkapan Mu*
        
🦀 Kepiting: ${anti1}
🦞 Lobster: ${anti2}
🦐 Udang: ${anti3}
🦑 Cumi: ${anti4}
🐙 Gurita: ${anti5}
🐡 Buntal: ${anti6}
🐠 Dory: ${anti7}
🐳 Orca: ${anti8}
🐬 Lumba: ${anti9}
🐋 Paus: ${anti10}
🦈 Hiu: ${anti11}

jika ingin melihat ikan yang didapat ketik .kolam
`
		global.db.data.users[m.sender].kepiting += rbrb1
		global.db.data.users[m.sender].lobster += rbrb2
		global.db.data.users[m.sender].udang += rbrb3
		global.db.data.users[m.sender].cumi += rbrb4
		global.db.data.users[m.sender].gurita += rbrb5
		global.db.data.users[m.sender].buntal += rbrb6
		global.db.data.users[m.sender].dory += rbrb7
		global.db.data.users[m.sender].orca += rbrb8
		global.db.data.users[m.sender].lumba += rbrb9
		global.db.data.users[m.sender].paus += rbrb10
		global.db.data.users[m.sender].hiu += rbrb11
		global.db.data.users[m.sender].fishingroddurability -= 10
		
		const arr = [
"Kail Mu Di Tarik Ikan dan kamu menarik nya",
"Kamu Berhasil Menarik Ikan Keluar Dari Air",
"Ini Dia Hasil Tangkapanmu"
  ]
  
const { key } = await conn.sendMessage(m.chat, { text: 'Kamu Sedang Memancingg....' });

for (let i = 0; i < arr.length; i++) {
  await new Promise(resolve => setTimeout(resolve, 10000));
  await  conn.editMessage(m.chat, key, arr[i])
}
conn.reply(m.chat, hsl, m)
		user.lastfishing = new Date * 1
	} else conn.reply(m.chat, `\n*Sepertinya Anda Sudah Kelelahan Memancing Silahkan Istirahat dulu sekitar ${timers}*\n*Untuk bisa melanjutkan memancing*\n`,m)
    } else conn.reply(m.chat, `ᴋᴀᴍᴜ ᴛɪᴅᴀᴋ ᴍᴇᴍᴘᴜɴʏᴀɪ *ꜰɪꜱʜɪɴɢʀᴏᴅ*\n ketik .craft fishingrod`, m)
}
handler.help = ['mancing']
handler.tags = ['rpg']
handler.command = /^(mancing|fishing)$/i

module.exports = handler


function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
    }
