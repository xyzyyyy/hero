let axios = require('axios')
let ryhar = async (m, {text}) => {
	if (!text) return m.reply("Url instagram nya mana?")
	let v = (await axios.get(`https://sh.xznsenpai.xyz/api/igdl?url=${text}`)).data
	await m.reply(`_Prosess..._`)
	for (let i of v.media) {
	conn.sendFile(m.chat, i, '', v.caption)
	}
}
ryhar.help = ['instagram']
ryhar.tags = ['downloader']
ryhar.command = ["ig", "igdl", "instagram"]
module.export = ryhar