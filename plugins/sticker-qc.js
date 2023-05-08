let handler = async (m, { conn, text }) => {

  if (!text) throw 'Masukan Teks nya!'

  conn.sendFile(m.chat, global.API('https://sh.xznsenpai.xyz', '/api/fakechat', {

    text: text,

    username: conn.getName(m.sender),

    avatar: await conn.profilePictureUrl(m.sender).catch(_ => '')

  }), 'yt-comment.png', 'ini', m)

}

handler.help = ['qc']

handler.tags = ['sticker']

handler.command = /^(qc)$/i

module.exports = handler

// https://sh.xznsenpai.xyz/api/fakechat?text=&username=&avatar=
