let handler = async (m, { conn, text }) => {
    if (m.quoted && m.quoted.text) text = m.quoted.text;
    var pp;
    try {
        pp = await conn.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender)
    } catch {
        throw `PP KOSONG DILARANG MENGGUNAKAN FITUR INI!`
    }
    let name = m.quoted ? await conn.getName(m.quoted.sender) : await conn.getName(m.sender)

    if (!text) throw 'Masukan Teks nya!'
    conn.sendFile(m.chat, global.API('https://sh.xznsenpai.xyz', '/api/fakechat', {
      text: text,
      username: name,
      avatar: pp
    }), 'yt-comment.png', 'ini', m)  
  }

handler.help = ['qc <text atau reply sebuah message>']
handler.tags = ['sticker']
handler.command = /^(qc)$/i

module.exports = handler