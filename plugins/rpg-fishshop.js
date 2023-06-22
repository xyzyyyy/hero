let { MessageType } = require('baileys')
const Bpaus = 35000
const Spaus = 10000
const Bkepiting = 25000
const Skepiting = 8000
const Bgurita = 40000
const Sgurita = 15000
const Bcumi = 10000
const Scumi = 5000
const Bdory = 60000
const Sdory = 30000
const Blumba = 1000000
const Slumba = 100000
const Bhiu = 900000
const Shiu = 300000
const Budang = 20000
const Sudang = 8000
const Bikan = 3000
const Sikan = 1000
const Borca = 40000
const Sorca = 15000
const Blobster = 10000
const Slobster = 8000
const Bbuntal = 15000
const Sbuntal = 7000
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
	if (!db.data.chats[m.chat].rpg && m.isGroup) throw 'Feature Rpg Dimatikan Di grup ini\nKetik *!on* *rpg* untuk mengaktifkan fitur'
	let user = global.db.data.home[m.sender]
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
const  Schat = `
${usedPrefix}fishop <Buy|sell> <item> <jumlah>\n
Contoh penggunaan: *${usedPrefix}fishop buy orca 1*\n\n
List Ikan:\n\n
*Ikan   |  Harga beli*\n
🐳Paus.       ${Bpaus}
🦀Kepiting. ${Bkepiting}
🐋Orca.       ${Borca}
🐟Ikan.        ${Bikan}
🦐Udang     ${Budang}
🐙Gurita.     ${Bgurita}
🦑Cumi².     ${Bcumi}
🐠Dory.        ${Bdory}
🐬Lumba²    ${Blumba}
🦞Lobster    ${Blobster}
🐡Buntal.     ${Bbuntal}\n\n
*Ikan   |  Harga Jual*\n
🐳Paus.       ${Spaus}
🦀Kepiting. ${Skepiting}
🐋Orca.       ${Sorca}
🐟Ikan.        ${Sikan}
🦐Udang     ${Sudang}
🐙Gurita.     ${Sgurita}
🦑Cumi.       ${Scumi}
🐠Dory.        ${Sdory}
🐬Lumba².    ${Slumba}\n\n
`.trim()
     	try {
        if (/fishop|tokoikan/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            switch (jualbeli) {
            case 'buy':
                switch (_type) {
                    case 'paus':
                            if (global.db.data.home[m.sender].exp >= Bpaus * count) {
                                global.db.data.home[m.sender].exp -= Bpaus * count
                                global.db.data.home[m.sender].paus += count * 1
                                conn.reply(m.chat, `Succes membeli ${count} paus dengan harga ${Bpaus * count} exp\n\n`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} paus dengan harga ${paus * count} exp`,)
                        break
                    case 'ikan':
                            if (global.db.data.home[m.sender].exp >= Bikan * count) {
                                global.db.data.home[m.sender].ikan += count * 1
                                global.db.data.home[m.sender].exp -= Bikan * count
                                conn.reply(m.chat, `Succes membeli ${count} ikan dengan harga ${Bikan * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup`, m)
                        
                        break
                    case 'cumi':
                            if (global.db.data.home[m.sender].exp >= Bcumi * count) {
                                global.db.data.home[m.sender].cumi += count * 1
                                global.db.data.home[m.sender].exp -= Bcumi * count
                                conn.reply(m.chat, `Succes membeli ${count} cumi  dengan harga ${Bcumi * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} cumi dengan harga ${Bcumi * count} exp\n\n*`, m)
                        
                        break
                    case 'kepiting':
                            if (global.db.data.home[m.sender].exp >= Bkepiting * count) {
                                global.db.data.home[m.sender].kepiting += count * 1
                                global.db.data.home[m.sender].exp -= Bkepiting * count
                                conn.reply(m.chat, `Succes membeli ${count} kepiting  dengan harga ${Bkepiting * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} kepiting  dengan harga ${Bkepiting * count} exp\n\n*`, m)
                        
                        break
                    case 'udang':
                            if (global.db.data.home[m.sender].exp >= Budang * count) {
                                    global.db.data.home[m.sender].udang += count * 1
                                global.db.data.home[m.sender].exp -= Budang * count
                                conn.reply(m.chat, `Succes membeli ${count} udang  dengan harga ${Budang * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} udang  dengan harga ${Budang* count} exp\n\n*`, m)
                        
                        break
                    case 'dory':
                            if (global.db.data.home[m.sender].exp >= Bdory * count) {
                                global.db.data.home[m.sender].dory += count * 1
                                global.db.data.home[m.sender].exp -= Bdory * count
                                conn.reply(m.chat, `Succes membeli ${count} dory  dengan harga ${Bdory * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} dory  dengan harga ${Bdory * count} exp\n\n*`, m)
                        
                        break
                 case 'lobster':
                            if (global.db.data.home[m.sender].exp >= Blobster * count) {
                                global.db.data.home[m.sender].lobsyer += count * 1
                                global.db.data.home[m.sender].exp -= Blobster * count
                                conn.reply(m.chat, `Succes membeli ${count} dory  dengan harga ${Blobster * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} lobster  dengan harga ${Blobster * count} exp\n\n*`, m)
                        
                        break     
                    case 'buntal':
                            if (global.db.data.home[m.sender].exp >= Bbuntal * count) {
                                global.db.data.home[m.sender].buntal += count * 1
                                global.db.data.home[m.sender].exp -= Bbuntal * count
                                conn.reply(m.chat, `Succes membeli ${count} buntal  dengan harga ${Bbuntal * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} buntal  dengan harga ${Bbuntal * count} exp\n\n*`, m)
                        
                        break                   
                        case 'orca':
                            if (global.db.data.home[m.sender].exp >= Borca * count) {
                                global.db.data.home[m.sender].exp -= Borca * count
                                global.db.data.home[m.sender].orca += count * 1
                                conn.reply(m.chat, `Succes membeli  orca dengan harga ${Borca * count} exp\n\n`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} orca dengan hargBo) * count} exp\n\n`, m)
                        break
                    case 'gurita':
                            if (global.db.data.home[m.sender].exp >= Bgurita * count) {
                                global.db.data.home[m.sender].gurita += count * 1
                                global.db.data.home[m.sender].exp -= Bgurita * count
                                conn.reply(m.chat, `Succes membeli ${count} gurita dengan harga ${Bgurita * count} exp`, m)
                            } else conn.reply(m.chat, `exp anda tidak cukup untuk membeli ${count} gurita dengan harga ${Bgurita * count} exp`.trim(), m)
                            break
                }
                break
            case 'sell': 
                switch (_type) {
                    case 'orca':
                        if (global.db.data.home[m.sender].orca >= count * 1) {
                            global.db.data.home[m.sender].exp += Sorca * count
                            global.db.data.home[m.sender].orca -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} orca dengan harga ${Sorca * count} exp`.trim(), m)
                        } else conn.reply(m.chat, `orca kamu tidak cukup`.trim(), m)
                        break
                    case 'ikan':
                        if (global.db.data.home[m.sender].ikan >= count * 1) {
                            global.db.data.home[m.sender].exp += Sikan * count
                            global.db.data.home[m.sender].ikan -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} ikan  dengan harga ${Sikan * count} exp`.trim(), m)
                        } else conn.reply(m.chat, `ikan  kamu tidak cukup`.trim(), m)
                        break
                    case 'paus':
                        if (global.db.data.home[m.sender].paus >= count * 1) {
                            global.db.data.home[m.sender].exp += Spaus * count
                            global.db.data.home[m.sender].paus -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} paus  dengan harga ${Spaus * count} exp`.trim(), m)
                        } else conn.reply(m.chat, `paus  kamu tidak cukup`.trim(), m)
                        break
                    case 'gurita':
                        if (global.db.data.home[m.sender].gurita >= count * 1) {
                            global.db.data.home[m.sender].exp += Sgurita * count
                            global.db.data.home[m.sender].gurita -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} gurita  dengan harga ${Sgurita * count} exp`.trim(), m)
                        } else conn.reply(m.chat, `gurita  kamu tidak cukup`.trim(), m)
                        break
                    case 'udang':
                        if (global.db.data.home[m.sender].udang >= count * 1) {
                            global.db.data.home[m.sender].exp += Sudang * count
                            global.db.data.home[m.sender].udang -= count * 1
                            conn.reply(m.chat, `Succes menjual ${count} udang  dengan harga ${Sudang * count} exp`.trim(), m)
                        } else conn.reply(m.chat, `udang  kamu tidak cukup`.trim(), m)
                        break
                     case 'buntal':
                        if (global.db.data.home[m.sender].buntal >= count * 1) {
                            global.db.data.home[m.sender].buntal -= count * 1
                            global.db.data.home[m.sender].exp += Sbuntal * count
                            conn.reply(m.chat, `Succes menjual ${count} buntal, dan anda mendapatkan ${Sbuntal * count} exp`, m)
                        } else conn.reply(m.chat, `buntal anda tidak cukup`, m)
                        break
                    case 'lobster':
                        if (global.db.data.home[m.sender].lobster >= count * 1) {
                            global.db.data.home[m.sender].lobster -= count * 1
                            global.db.data.home[m.sender].exp += Slobster * count
                            conn.reply(m.chat, `Succes menjual ${count} lobster, dan anda mendapatkan ${Slobster * count} exp`, m)
                        } else conn.reply(m.chat, `lobster anda tidak cukup`, m)
                        break
                    case 'dory':
                        if (global.db.data.home[m.sender].dory >= count * 1) {
                            global.db.data.home[m.sender].dory -= count * 1
                            global.db.data.home[m.sender].exp += Sdory * count
                            conn.reply(m.chat, `Succes menjual ${count} dory, dan anda mendapatkan ${Sdory * count} exp`, m)
                        } else conn.reply(m.chat, `dory anda tidak cukup`, m)
                        break
                    case 'cumi':
                        if (global.db.data.home[m.sender].cumi >= count * 1) {
                            global.db.data.home[m.sender].cumi -= count * 1
                            global.db.data.home[m.sender].exp += Scumi * count
                            conn.reply(m.chat, `Succes menjual ${count} cumi, dan anda mendapatkan ${Scumi * count} exp`, m)
                        } else conn.reply(m.chat, `cumi anda tidak cukup`, m)
                        break
                    case 'kepiting':
                        if (global.db.data.home[m.sender].kepiting >= count * 1) {
                            global.db.data.home[m.sender].kepiting -= count * 1
                            global.db.data.home[m.sender].exp += Skepiting * count
                            conn.reply(m.chat, `Succes menjual ${count} kepiting, dan anda mendapatkan ${Skepiting * count} exp`, m)
                        } else conn.reply(m.chat, `kepiting anda tidak cukup`, m)
                        break
                    case 'hiu':
                        if (global.db.data.home[m.sender].hiu >= count * 1) {
                            global.db.data.home[m.sender].hiu -= count * 1
                            global.db.data.home[m.sender].exp += Shiu * count
                            conn.reply(m.chat, `Succes menjual ${count} hiu, dan anda mendapatkan ${Shiu * count} exp`, m)
                        } else conn.reply(m.chat, `Hiu anda tidak cukup`, m)
                        break
                    case 'cumi':
                        if (global.db.data.home[m.sender].cumi >= count * 1) {
                            global.db.data.home[m.sender].cumi -= count * 1
                            global.db.data.home[m.sender].exp += Scumi * count
                            conn.reply(m.chat, `Succes menjual ${count} cumi, dan anda mendapatkan ${Scumi * count} exp`, m)
                        } else conn.reply(m.chat, `Cumi anda tidak cukup`, m)
                        break
                    case 'lumba':
                        if (global.db.data.home[m.sender].lumba >= count * 1) {
                            global.db.data.home[m.sender].lumba -= count * 1
                            global.db.data.home[m.sender].exp += Slumba * count
                            conn.reply(m.chat, `Succes menjual ${count} lumba, dan anda mendapatkan ${Slumba * count} exp`, m)
                        } else conn.reply(m.chat, `lumba anda tidak cukup`, m)
                        break
                }   break                 
               default:
                        return conn.reply(m.chat, Schat, m)
                        }
            }
        }catch (e) {
        conn.reply(m.chat, Schat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'fishop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
              
            }
        }
    }
  }
handler.help = ['fishop <sell|buy>  <item> <args>', 'tokoikan <sell|buy> <item> <args>']
handler.tags = ['rpg']

//handler.command = /^(fishop|tokoikan)$/i
//handler.register = true
  
module.exports = handler