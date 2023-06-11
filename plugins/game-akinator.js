let {Aki} = require("aki-api")
let fetch = require("node-fetch")
let wm = "Fld x Ido"
let images = "https://telegra.ph/file/e8e018696c574fc386e3b.jpg"
//let wm = global.set.wm
let handler = async(m, { conn, args }) => {
    conn.dbAkinator = conn.dbAkinator ? conn.dbAkinator : {}
    switch (args[0]) {
        case "start":
            if( conn.dbAkinator[m.chat] && conn.dbAkinator[m.chat].isOnSession === true ) {
                let diGame = `*AKINATOR GAME*\n\nKamu sudah berada didalam permainan\nGame Session.\n  => Untuk melihat sesi akinator anda\n.akinator stop\n  => Stop bermain Akinator`
                await conn.sendMessage(m.chat, diGame, m)
            } else {
                conn.dbAkinator[m.chat] = new Aki({region: 'id', childMode: false, proxy: undefined})
                conn.dbAkinator[m.chat].isOnSession = true
                await conn.dbAkinator[m.chat].start()
                
                let ikinitir = `=> Step : ${conn.dbAkinator[m.chat].currentStep + 1}\n=> Progress : ${conn.dbAkinator[m.chat].progress}%\n=> Pertanyaan : ${conn.dbAkinator[m.chat].question}
                Untuk Menjawab Pertanyaan Silahkan Ketik : 
                Ya -> .akinator answer 0
                Tidak -> .akinator answer 1
                Tidak tau -> .akinator answer 2
                Mungkin -> .akinator answer 3
                Mungkin tidak -> .akinator answer 4`
                await conn.sendMessage(m.chat, ikinitir)
            }
        break
            
        case "stop":
            if (!conn.dbAkinator[m.chat]) return m.reply("Kamu tidak berada didalam game!")
            let stopGame = "*AKINATOR GAME*\n\n Kamu sudah keluar dari Akinator>\n.akinator start\n  => Untuk mulai bermain Akinator\n"
            
            await conn.sendMessage(m.chat, stopGame, m)
            delete conn.dbAkinator[m.chat]
        break
        
        case "answer":
            if (!conn.dbAkinator[m.chat]) return m.reply("Kamu tidak berada didalam game!")
            else {
                if (conn.dbAkinator[m.chat].progress >= 70 || conn.dbAkinator[m.chat].currentStep >= 78) {
                    await conn.dbAkinator[m.chat].win()
                    if (conn.dbAkinator[m.chat].answers) {
                        let ans = conn.dbAkinator[m.chat].answers[0]
                        let hasil = `*AKINATOR GAME RESULT*\nSaya pikir itu adalah : \n\n=> *Jawaban:* ${ans.name}\n=> *Deskripsi:* ${ans.description}\nApakah jawaban saya benar?\nBenar : .akinator benar\nSalah : .akinator salah\nMulai Lagi : .akinator start`
                        await conn.sendMessage(m.chat, hasil, wm, await (await fetch(conn.dbAkinator[m.chat].answers[0].absolute_picture_path)).buffer(), m)
                        return delete conn.dbAkinator[m.chat]
                    }
                } else {
                    switch (args[1]) {
                        case "0":
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                            await conn.dbAkinator[m.chat].step(args[1])
                            let ikinitir = `=> Step : ${conn.dbAkinator[m.chat].currentStep + 1}\n=> Progress : ${conn.dbAkinator[m.chat].progress}%\n=> Pertanyaan : ${conn.dbAkinator[m.chat].question}
                Untuk Menjawab Pertanyaan Silahkan Ketik : 
                Ya -> .akinator answer 0
                Tidak -> .akinator answer 1
                Tidak tau -> .akinator answer 2
                Mungkin -> .akinator answer 3
                Mungkin tidak -> .akinator answer 4`
                await conn.sendMessage(m.chat, ikinitir)
                        break
                    }
                }
            }
        break
        
        case "benar":
            let benar = `yey saya berhasil menjawab\nMau main lagi?\n.akinator start`
            conn.reply(m.chat, benar, m)
        break
        
        case "salah":
            let salah = 'yah salah ya...\n mungkin kamu memasukkan data dengan salah\nmau coba lagi?\n.akinator start'
            conn.reply(m.chat, salah, m)
        break
        
        case "mysession":
            if (!conn.dbAkinator[m.chat]) return m.reply("Kamu tidak berada didalam game!")
            let ikinitir = `=> Step : ${conn.dbAkinator[m.chat].currentStep + 1}\n=> Progress : ${conn.dbAkinator[m.chat].progress}%\n=> Pertanyaan : ${conn.dbAkinator[m.chat].question}
                Untuk Menjawab Pertanyaan Silahkan Ketik : 
                Ya -> .akinator answer 0
                Tidak -> .akinator answer 1
                Tidak tau -> .akinator answer 2
                Mungkin -> .akinator answer 3
                Mungkin tidak -> .akinator answer 4`
                await conn.sendMessage(m.chat, ikinitir)
        break
        
        default:
            let img = await (await fetch(images)).buffer()
            let awalGame = `*AKINATOR GAME*\n\n Pikirkan seorang karakter fiksi atau nyata.\nBot akan mencoba untuk menebaknya\n.akinator start => Untuk mulai bermain Akinator\n.akinator stop => Untuk mulai bermain Akinator\n.akinator mysession => Untuk melihat sesi Akinator kamu\n`
            await conn.sendFile(m.chat, awalGame, img, m)
        break
    } // switch
}

handler.help = ['akinator']
handler.tags = ['game']
handler.command = /^akinator$/i

module.exports = handler

// by ktdprjct x ido