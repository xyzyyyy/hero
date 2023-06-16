let axios = require('axios')
let ryhar = async (m, {text}) => {
	if (!text) throw ('Command Ini Multi Downloader Support url: tiktok, instagram, facebook, youtube, twitter_')
	 let resp = await axios.get(`https://xzn.wtf/api/download?url=${text}&apikey=ryhar`).catch(e => e.response)
	const arr = [
"《 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%",
"《 ███▒▒▒▒▒▒▒▒▒▒▒》20%",
"《 ██████▒▒▒▒▒▒▒▒》40%",
"《 █████████▒▒▒▒▒》60%",
"《 ████████████▒▒》80%",
"《 ██████████████》100%",
  "Done!!",
  "Mohon Tunggu Bot Sedang Mengirim Video nya\nJangan Lupa Dukung Bot Ini https://saweria.co/rahardiyan"
  ]
  
const { key } = await conn.sendMessage(m.chat, { text: '_in progress, please wait..._' });

for (let i = 0; i < arr.length; i++) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await  conn.editMessage(m.chat, key, arr[i])
}
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