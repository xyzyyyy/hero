let axios = require('axios')
let ryhar = async (m, {text}) => {
	if (!text) throw ('Command Ini Multi Downloader Support url: tiktok, instagram, facebook, youtube, twitter_')
	 let resp = await axios.get(`https://xzn.wtf/api/download?url=${text}&apikey=ryhar`).catch(e => e.response)
	await m.reply(`_in progress, please wait..._\nJangan Lupa Dukung Bot Ini https://saweria.co/rahardiyan`)
	if (resp.status != 200) throw resp.statusText
	let data = resp.data
	if (Array.isArray(data)) {
	  for (let x of data) await conn.sendFile(m.chat, x.url[0].url, "", "", m)
	} else await await conn.sendFile(m.chat, data.url[0].url, "", data.meta.title, m)
}
ryhar.help = ['dl']
ryhar.tags = ['downloader']
ryhar.command = /^dl()?$/i
module.exports = ryhar