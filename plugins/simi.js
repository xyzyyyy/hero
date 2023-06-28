let fetch = require('node-fetch')

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
        let res = await SimSimi(text)
        await m.reply(res)
}
handler.command = /^simi$/i

module.exports = handler
/* New Line */
async function SimSimi(input) {
    try {
        let res = await fetch('http://api.simsimi.com/request.p?key=ae752867-ab2f-4827-ab64-88aebed49a1c&lc=id&text=' + encodeURIComponent(input))
        let json = await res.json()
        return json.response
    } catch (e) {
        throw "Erorr"
    }
      }
