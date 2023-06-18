const skata = require('../api/games/sambung-kata')
const similarity = require('similarity')
const threshold = 0.72
let handler = m => m

handler.before = async function(m, { conn }){
    let rowGame = Object.values(plugins).filter(v => v.tags == "game").map(v => v.help).flat(1).map(v => v.split(' ')[0])
    let setting = global.db.data.settings[conn.user.jid]
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    let id = m.chat
    //========
    
    
    // math
    conn.math = conn.math ? conn.math : {}
    if ((id in conn.math)) {
      if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return 
      let math = JSON.parse(JSON.stringify(conn.math[id][1]))
      if (m.text == math.result) {
        user.exp += math.bonus
        clearTimeout(conn.math[id][3])
        await conn.sendListM(m.chat, `${set.sa} C O N G R A T S\n`, `Selamat @${parseInt(m.sender)}\nJawaban *${m.text}* benar!\n\nBonus: *+${math.bonus}* XP `, set.wm, rowGame, m)                
        delete conn.math[id]
      } else {
        if (--conn.math[id][2] == 0) {
          clearTimeout(conn.math[id][3])
          await conn.sendListM(m.chat, `${set.sa} O P P O R T U N I T Y  I S  U P\n`, `Maaf @${parseInt(m.sender)}\nkesempatan menjawab sudah habis!\n\nJawaban: *${math.result}*`, set.wm, rowGame, m)                          
          delete conn.math[id]
        } else m.reply(`*Jawaban Salah!*\nMasih ada ${conn.math[id][2]} kesempatan`)
      }
    } 
    // sambung kata
    this.skata = this.skata ? this.skata : {}
    if ((id in this.skata)) {
      let room = this.skata[id]
      let users = db.data.users
      let _kata = await genKata()
      let member = room.player
      let bonus = rwd(500, 600)
      let lose_skata
      let win_skata
      function mmr(apa = '', jid = '') {
        let user = db.data.users[jid]
        if (apa == 'win') {
          if (user.skata > 5000) win_skata = rwd(5, 9)
          else if (user.skata > 3000) win_skata = rwd(5, 10)
          else if (user.skata > 1500) win_skata = rwd(10, 15)
          else if (user.skata > 1000) win_skata = rwd(15, 20)
          else if (user.skata > 500) win_skata = rwd(20, 30)
          else win_skata = rwd(30, 50)
        } else {
          if (user.skata > 8000) lose_skata = rwd(35, 50)
          else if (user.skata > 5000) lose_skata = rwd(25, 30)
          else if (user.skata > 3000) lose_skata = rwd(20, 25)
          else if (user.skata > 1500) lose_skata = rwd(15, 19)
          else if (user.skata > 1000) lose_skata = rwd(10, 14)
          else if (user.skata > 500) lose_skata = rwd(5, 9)
          else lose_skata = rwd(1, 5)
        }
        if (apa == 'win') return win_skata
        else return lose_skata
      }
      let who
      if (room.new) {
        if (!/nextkata/i.test(m.text)) return 
        room.new = false
        room.killer = false
        room.kata = _kata
        room.chat = await this.reply(m.chat, `Saatnya @${room.curr.split(`@`)[0]}\nMulai : *${(_kata).toUpperCase()}*\n*${room.filter(_kata).toUpperCase()}... ?*\n*Reply untuk menjawab!*\n"nyerah" untuk menyerah\nXP terkumpul: ${room.win_point}\nTersisa: \n${this.readmore + room.player.map((v, i) => i + 1 + '. ' + users[v].name).join('\n')}`, m, { mentions: [room.curr] })                 
      }
      if (room.diam) {
        if (!/nextkata/i.test(m.text)) return !0
        room.diam = false
        room.waktu = setTimeout(() => {
          lose_skata = mmr('lose', room.curr)
          win_skata = (room.killer ? mmr('win', room.killer) : null)
          this.reply(m.chat, `Waktu jawab habis\n@${room.curr.split`@`[0]} tereliminasi -${lose_skata} MMR${room.killer ? `\n@${room.killer.split`@`[0]} +${win_skata} MMR` : ''}`, room.chat, { mentions: [room.curr, room.killer] }).then(_ => {
          room.eliminated.push(room.curr)
          if (room.killer) {
            users[room.killer].skata += win_skata
            users[room.curr].skata -= lose_skata
          }
          let index = member.indexOf(room.curr)
          member.splice(index, 1)
          if (index == member.length) room.curr = member[0]
          else room.curr = member[index]
          if (member.length == 1 && room.status == 'play') {
            this.sendButton(m.chat, `@${member[0].split`@`[0]} Berhasil bertahan`, `+${room.win_point}XP`, 0, [['Sambung Kata', '.skata'], ['Top Player', '.topskata']], room.chat, { mentions: member }).then(_ => {
              users[member[0]].exp += room.win_point
              delete this.skata[id]
              return 
            })
          } else {
            room.diam = true
            room.new = true
            who = room.curr
            this.preSudo('nextkata', who, m).then(_=> { 
              this.ev.emit('messages.upsert', _)
	    })
          }
        })
      }, 30000)
    }
    if (room.curr == m.sender) {
      if (/nyerah/i.test(m.text)) {
	lose_skata = mmr('lose', room.curr)
	win_skata = (room.killer ? mmr('win', room.killer) : null)
	clearTimeout(room.waktu)
	this.reply(m.chat, `@${room.curr.split`@`[0]} tereliminasi -${lose_skata} MMR${room.killer ? `\n@${room.killer.split`@`[0]} +${win_skata} MMR` : ''}`, room.chat, { mentions: [room.curr, room.killer] })
	room.eliminated.push(room.curr)
	if (room.killer) {
           users[room.killer].skata += win_skata
           users[room.curr].skata -= lose_skata
        }
	let index = member.indexOf(room.curr)
	member.splice(index, 1)
	if (index == (member.length)) room.curr = member[0]
	else room.curr = member[index]
	if (member.length == 1 && room.status == 'play') {
          await this.sendButton(m.chat, `@${member[0].split`@`[0]} Berhasil bertahan`, `+${room.win_point}XP`, 2, ['Sambung Kata', '.skata', 'Top Player', '.topskata'], room.chat, { mentions: [member[0]] })
          users[member[0]].skata += win_skata
          users[member[0]].exp += room.win_point
          delete this.skata[id]
          return 
        }
	room.new = true
	room.diam = true
	who = room.curr
	let msg = await conn.preSudo('nextkata', who, m)
	this.ev.emit('messages.upsert', msg)
      }
      if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(Mulai|Tersisa) ?:/i.test(m.quoted.text)) return 
      if (m.quoted.id == room.chat.id) {
	let answerF = (m.text.toLowerCase().split` `[0]).trim().replace(/[^a-z]/gi, '')
	let checkF = await skata.cKata(m.text.toLowerCase().split` `[0])
	if (!answerF.startsWith(room.filter(room.kata))) {
            return m.reply(`👎🏻 *Salah!*\nJawaban harus dimulai dari kata *${room.filter(room.kata)}*`)
          } else if (!checkF.status) {
            return m.reply(`👎🏻 *Salah!*\nKata *${m.text.toUpperCase()}* tidak valid!`)
          } else if ((room.filter(room.kata)) == answerF) {
            return m.reply(`👎🏻 *Salah!*\nJawabanmu sama dengan soal, silahkan cari kata lain!`)
          } else if (room.basi.includes(answerF)) {
            return m.reply(`👎🏻 *Salah!*\nKata *${m.text.toUpperCase()}* sudah pernah digunakan!`)
          }
          clearTimeout(room.waktu)
          room.killer = room.curr
          users[m.sender].exp += bonus
          let waktunya = member.indexOf(room.curr)
          room.curr = member[waktunya + 1]
          if (waktunya + 1 >= member.length) room.curr = member[0]
          room.basi.push(answerF)
          room.win_point += 200
          room.chat = await this.reply(m.chat, `👍+${bonus}XP\nGiliran @${room.curr.split`@`[0]}\n*${room.filter(answerF).toUpperCase()}... ?*\n*Reply untuk menjawab!*\n"nyerah" untuk menyerah\nXP terkumpul: ${room.win_point}\nTersisa: \n${this.readmore + room.player.map((v, i) => i + 1 + '. ' + users[v].name).join('\n')}`, m, { mentions: [room.curr] })
          room.diam = true
          room.kata = answerF
          who = room.curr
          let msg = await this.preSudo('nextkata', who, m)
          this.ev.emit('messages.upsert', msg)
          return 
        }
      } else if (room.curr !== m.sender) {
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(Mulai|Tersisa) ?:/i.test(m.quoted.text)) return 
        if (m.quoted.id == room.chat.id) {
          if (room.eliminated.includes(m.sender)) m.reply(`_Hei, kamu sudah tereliminasi, tunggu hingga game ini selesai_\n*Nice Try, next game*`)
          else if (room.player.includes(m.sender)) {
            m.reply(`_Bukan giliranmu.._`)
          } else m.reply(`_*Kamu tidak dapat menjawab soal itu*_\nKarena kamu tidak bergabung dalam game ini\n\nTunggu hingga game ini berakhir, kemudian ikutlah bermain!`)
        } else m.reply(`Soal itu sudah lewat`)
      }
    }
    // role user
    let role = (user.level <= 3) ? 'Warrior V'
    : ((user.level >= 3) && (user.level <= 50)) ? 'Warrior IV'
    : ((user.level >= 50) && (user.level <= 100)) ? 'Warrior III'
    : ((user.level >= 100) && (user.level <= 150)) ? 'Warrior II'
    : ((user.level >= 150) && (user.level <= 200)) ? 'Warrior I'
    : ((user.level >= 200) && (user.level <= 250)) ? 'Elite V'
    : ((user.level >= 250) && (user.level <= 300)) ? 'Elite IV'
    : ((user.level >= 300) && (user.level <= 350)) ? 'Elite III'
    : ((user.level >= 350) && (user.level <= 400)) ? 'Elite II'
    : ((user.level >= 400) && (user.level <= 450)) ? 'Elite I'
    : ((user.level >= 450) && (user.level <= 500)) ? 'Master V'
    : ((user.level >= 500) && (user.level <= 550)) ? 'Master IV'
    : ((user.level >= 550) && (user.level <= 600)) ? 'Master III'
    : ((user.level >= 600) && (user.level <= 650)) ? 'Master II'
    : ((user.level >= 650) && (user.level <= 700)) ? 'Master I'
    : ((user.level >= 700) && (user.level <= 750)) ? 'Grand Master V'
    : ((user.level >= 750) && (user.level <= 800)) ? 'Grand Master IV'
    : ((user.level >= 800) && (user.level <= 850)) ? 'Grand Master III'
    : ((user.level >= 850) && (user.level <= 900)) ? 'Grand Master II'
    : ((user.level >= 900) && (user.level <= 950)) ? 'Grand Master I'
    : ((user.level >= 950) && (user.level <= 1000)) ? 'Epic V'
    : ((user.level >= 1000) && (user.level <= 1050)) ? 'Epic IV'
    : ((user.level >= 1050) && (user.level <= 1100)) ? 'Epic III'
    : ((user.level >= 1100) && (user.level <= 1150)) ? 'Epic II'
    : ((user.level >= 1150) && (user.level <= 1200)) ? 'Epic I'
    : ((user.level >= 1200) && (user.level <= 1250)) ? 'Legend V'
    : ((user.level >= 1250) && (user.level <= 1300)) ? 'Legend IV'
    : ((user.level >= 1300) && (user.level <= 1350)) ? 'Legend III'
    : ((user.level >= 1350) && (user.level <= 1400)) ? 'Legend II'
    : ((user.level >= 1400) && (user.level <= 1450)) ? 'Legend I'
    : ((user.level >= 1450) && (user.level <= 1500)) ? 'Mythic V'
    : ((user.level >= 1500) && (user.level <= 1550)) ? 'Mythic IV'
    : ((user.level >= 1550) && (user.level <= 1600)) ? 'Mythic III' 
    : ((user.level >= 1600) && (user.level <= 1650)) ? 'Mythic II' 
    : ((user.level >= 1650) && (user.level <= 1700)) ? 'Mythic I'
    : ((user.level >= 1700) && (user.level <= 1750)) ? 'Mythic Honor V'
    : ((user.level >= 1750) && (user.level <= 1800)) ? 'Mythic Honor IV'
    : ((user.level >= 1800) && (user.level <= 1850)) ? 'Mythic Honor III'
    : ((user.level >= 1850) && (user.level <= 1900)) ? 'Mythic Honor II'
    : ((user.level >= 1900) && (user.level <= 1950)) ? 'Mythic Honor I'
    : 'Mythic Glory'
    user.role = role
    //=========
}
handler.exp = 0
module.exports = handler

async function genKata() {
	let json = await skata.kata()
	let result = json.kata
	while (result.length < 3) {
		json = await skata.kata()
		result = json.kata
	}
	return result
}
 
function rwd(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
