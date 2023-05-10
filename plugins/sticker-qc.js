const axios = require('axios');
let handler = async (m, { conn, text }) => {
    if (m.quoted && m.quoted.text) text = m.quoted.text;
    var pp;
    try {
        pp = await conn.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender)
    } catch {
        throw `FOTO PROFILE KOSONG DILARANG MENGGUNAKAN FITUR INI!`
    }
    let name = m.quoted ? await conn.getName(m.quoted.sender) : await conn.getName(m.sender)

    if (!text) throw 'Masukan Teks nya!'
    const request = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#202c33",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [
          {
          "entities": [],
          "avatar": true,
          "from": {
              "id": 1,
              "name": name,
              "photo": {
              "url": pp
              }
          },
          "text": text,
          "replyMessage": {}
          }
      ]
  };
  const { data } = await axios.post("https://bot.lyo.su/quote/generate", request, {
      headers: { 'Content-Type': 'application/json' }
  });
  if (data.result.image) {
    return await conn.sendFile(m.chat, Buffer.from(data.result.image, 'base64'), 'yt-comment.png', 'ini', m)  
  } else throw `Terjadi kesalahan, silahkan coba lagi.`
}
handler.help = ['qc <text atau reply sebuah message>']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

module.exports = handler