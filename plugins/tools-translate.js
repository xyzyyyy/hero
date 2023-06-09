let fetch = require('node-fetch')

let handler = async (m, { args, usedPrefix, command }) => {
    let lang, text
	if (args.length >= 2) {
		lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
	} else if (m.quoted && m.quoted.text) {
		lang = args[0] ? args[0] : 'id', text = m.quoted.text
	} else throw `Ex: ${usedPrefix + command} id hello i am robot`
	let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + lang + '&dt=t&q=' + text)
	let res = await reis.json()
	let lister = Object.keys(await langList())
	let supp = `Error : Bahasa"${lang}" Tidak Support`
	if (!lister.includes(lang)) return m.reply(supp + "\n\n*Example:*\n." + command + " id hello\n\n*Pilih kode yg ada*\n" + lister.map((v, index) => `${index +1}. ${v}`).join('\n'))
	const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
	let Detect = regionNamesInEnglish.of(res[2].toUpperCase() ? res[2].toUpperCase() : 'US')
	let ToLang = regionNamesInEnglish.of(lang.toUpperCase())
	let caption = `*[ Terdeteksi ]*
- ${Detect}

*[ Ke Bahasa ]*
- ${ToLang}

*[ Terjemahan ]*
- ${res[0][0][0]}
`
m.reply(caption)
}
handler.help = ['translate'].map(v => v + ' <lang> <teks>')
handler.tags = ['tools']
handler.command = /^(t(erjemahkan|ransl(ate|et))|t(erjemah|r)|apanih)$/i
module.exports = handler

async function langList() {
 let data = await fetch("https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q=")
  .then((response) => response.json())
  return data.tl;
  }