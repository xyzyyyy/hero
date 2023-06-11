let axios = require('axios')

let { webp2png } = require('../lib/webp2mp4.js')

let handler = async (m, ctx) => {

	try {		let q = m.quoted ? m.quoted : m,

			mime = (q.msg || q).mimetype || ''

		if (/image/g.test(mime)) {

			await m.reply('_In progress, please wait..._')

			let img = await webp2png(await q.download())

			await conn.sendFile(m.chat, `https://xzn.wtf/api/toanime?url=${img}&apikey=ryhar`, '.jpg', 'Success\n\njngn lupa dukung bot ini https://saweria.co/rahardiyan', m)

		} else throw `kirim / reply gambar`

	} catch (e) {

		throw JSON.stringify(e)

	}

}

handler.help = ['jadianime']

handler.tags = ['tools']

handler.command = /^jadianime|toanime$/i

module.exports = handler
