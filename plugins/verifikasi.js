const { createHash } = require('crypto')
let handler = async(m, { conn, text }) => {

    if(!text) throw "masukkan code otpnya!!!"

    let id = m.chat

    conn.sendMail = conn.sendMail ? conn.sendMail : {}

    

    if(conn.sendMail[id] == undefined ) {

        conn.reply(m.chat, "waktu habis. silahkan regist ulang!", m)

    } else {

        if (text == conn.sendMail[id].otpCode) {

        conn.reply(m.chat, "Registrasi Berhasil\n\nserial number = ${sn}\nSimpan SN mu jangan sampai hilang, akan dibutuhkan pada saat waktu yang tepat", m)
        let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Anda sudah terdaftar`
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')

        delete conn.sendMail[id]

        } else conn.reply(m.chat, "gagal silahkan masukkan ulang otp nya", m)

    }

}

handler.help = ['verifikasi']

handler.tags = ['exp']

handler.command = /^(verifikasi|verif|verifi)$/i

module.exports = handler
