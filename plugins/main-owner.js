let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

  const sentMsg = await conn.sendContact(m.chat, [
    [`62882008211320@s.whatsapp.com`, `${await conn.getName(62882008211320+'@s.whatsapp.net')}`, `💌 ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ sɪ ʀᴀʜᴀʀᴅɪʏᴀɴ`, `ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ <=> ʀᴀʜᴀʀᴅɪʏᴀɴ`, `rhrdiyan@my.id`, `🇮🇩 Indonesia`, `📍 https://rhrdiyan.my.id/`, `ᴏᴡɴᴇʀ ʙᴏᴛ, ʀᴀsᴀʜ sᴘᴀᴍ ᴄʜᴀᴛ ᴀɴᴇʜ ᴀɴᴇʜ, ᴀᴋᴜ ʏʜᴏ ɴɢᴇʀᴛɪ ʏᴇɴ ᴋᴡᴇ ʏʜᴏ ᴀɴᴇʜ, ɪɴᴛɪɴᴇ ɴɢᴜɴᴜ, sᴇɴᴇɴɢ ɴɢᴜᴛᴀᴋ ɴɢᴀᴛɪᴋ ɴɢᴀɴᴛɪ ᴇʀʀᴏʀ :𝟹`]
  ])
  await m.reply(`ʜᴇʟʟᴏ @${m.sender.split(`@`)[0]} ᴛʜᴀᴛs ᴍʏ ᴏᴡɴᴇʀ ᴅᴏɴᴛ sᴘᴀᴍ ᴏʀ ʏᴏᴜ ᴡɪʟʟ ʙᴇ ʙʟᴏᴄᴋᴇᴅ`)
  } 
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler