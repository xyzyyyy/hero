let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command }) => {
  try {
  	  if (!text) 
  let res = await fetch('https://yt.nxr.my.id/yt2?url=+`${m.text}`+&type=video')
  let json = await res.json()
  conn.sendFile(m.chat, json.url, 'Nihh Videonya', website, m)
  } catch {
    throw eror 
  }
}
handler.command = /^(ytv|ytmp4|mp4)$/i

handler.limit = true

module.exports = handler