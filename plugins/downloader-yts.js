let yts = require('yt-search')
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Example:\n${usedPrefix + command} Rosses`
  let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
Judul: *${v.title}* 
Link: *(${v.url})*
Durasi: ${v.timestamp}
Upload: ${v.ago}
Penonton: ${v.views} 
      `.trim()
      case 'channel': return `
Channel: *${v.name}*
Link: (${v.url})
Subscriber: ${v.subCountLabel} (${v.subCount})
Video: ${v.videoCount}
`.trim()
    }
  }).filter(v => v).join('\n====================================\n\n')
  m.reply(teks)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <query>')
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i

module.exports = handler
