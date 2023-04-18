let fetch = require('node-fetch')
  let axios = require('axios')
let handler = async(m, { conn, usedPrefix, command, args }) => {
  
  let ss = await(await fetch(`https://alpis.eu.org/api/tools/ssweb?link=${args[0]}`)).buffer()
  if(!args[0]) throw `Linknya mana?`  
conn.sendFile(m.chat, ss, `*「 Screenshot Web 」*\n\n*💻 Url:* ${args[0]}`, 'Nih kak screenshot website nya', m)
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^ss(web)?|scre?e?nshu?o?t$/i
module.exports = handler