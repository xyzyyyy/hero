let fs = require('fs')

let path = require('path')

let fetch = require('node-fetch')

let levelling = require('../lib/levelling')

let tags = {

  'main': 'Main',

  'game': 'Game',

  'rpg': 'Rpg',

  'xp': 'Exp & Limit',

  'sticker': 'Sticker',

  'quotes': 'Quotes',

  'group': 'Group',

  'internet': 'Internet',

  'downloader': 'Downloader',

  'tools': 'Tools',

  'owner': 'Owner',

  'advanced': 'Advanced',

  'info': 'Info',

}

const defaultMenu = {

  before: `

╭───❒ %me
│ Hai, %name!
│
│ ✧ Limit : *%limit Limit*
│ ✧ Total : *%totalfitur Fitur*
│ ✧ Uptime : *%uptime*
│ ✧ Total Regist: *%rtotalreg User*
│ ✧ Belum Regist: *%totalreg User*
│ ✧ Website: *https://rhrdiyan.my.id*
╰────
%readmore`.trimStart(),
  header: '╭───❑「 %category 」',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n',
  after: `
`,

}

let handler = async (m, { conn, usedPrefix: _p, expiration}) => {

  try {

    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))

    let { exp, money, limit, level, role } = global.db.data.users[m.sender]

    let { min, xp, max } = levelling.xpRange(level, global.multiplier)

    let name = conn.getName(m.sender)

    let totalf = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {

      return {

        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],

        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],

      }

    }).length

  

    let d = new Date(new Date + 3600000)

    let locale = 'id'

    // d.getTimeZoneOffset()

    // Offset -420 is 18.00

    // Offset    0 is  0.00

    // Offset  420 is  7.00

    let week = d.toLocaleDateString(locale, { weekday: 'long' })

    let date = d.toLocaleDateString(locale, {

      day: 'numeric',

      month: 'long',

      year: 'numeric'

    })

    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {

      day: 'numeric',

      month: 'long',

      year: 'numeric'

    }).format(d)

    let time = d.toLocaleTimeString(locale, {

      hour: 'numeric',

      minute: 'numeric',

      second: 'numeric'

    })

    let _uptime = process.uptime() * 1000

    let _muptime

    if (process.send) {

      process.send('uptime')

      _muptime = await new Promise(resolve => {

        process.once('message', resolve)

        setTimeout(resolve, 1000)

      }) * 1000

    }

    let muptime = clockString(_muptime)

    let uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length

    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {

      return {

        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],

        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],

        prefix: 'customPrefix' in plugin,

        limit: plugin.limit,

        premium: plugin.premium,

        enabled: !plugin.disabled,

      }

    })

    for (let plugin of help)

      if (plugin && 'tags' in plugin)

        for (let tag of plugin.tags)

          if (!(tag in tags) && tag) tags[tag] = tag

    conn.menu = conn.menu ? conn.menu : {}

    let before = conn.menu.before || defaultMenu.before

    let header = conn.menu.header || defaultMenu.header

    let body = conn.menu.body || defaultMenu.body

    let footer = conn.menu.footer || defaultMenu.footer

    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after

    let _text = [

      before,

      ...Object.keys(tags).map(tag => {

        return header.replace(/%category/g, tags[tag]) + '\n' + [

          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {

            return menu.help.map(help => {

              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)

                .replace(/%islimit/g, menu.limit ? '🅛' : '')

                .replace(/%isPremium/g, menu.premium ? '🅟' : '')

                .trim()

            }).join('\n')

          }),

          footer

        ].join('\n')

      }),

      after

    ].join('\n')

    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''

    let replace = {

      '%': '%',

      p: _p, uptime, muptime,

      me: conn.user.name,

      npmname: package.name,

      npmdesc: package.description,

      version: package.version,

      exp: exp - min,

      maxexp: xp,

      totalfitur: totalf,

      totalexp: exp,

      xp4levelup: max - exp,

      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',

      level, limit, money, name, week, date, dateIslamic, time, totalreg, rtotalreg, role,

      readmore: readMore

    }

    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    conn.reply(m.chat, text.trim(), m)

    

    //conn.send2ButtonImg(m.chat, `https://telegra.ph/file/9ad3a925d572438242a1e.jpg`, text.trim(), '🅛=limit 🅟=premium', 'donate', `${_p}donate`, `owner`,`${_p}owner`, m)

    //conn.send2ButtonImg(m.chat, `https://telegra.ph/file/9ad3a925d572438242a1e.jpg`, text.trim())

  } catch (e) {

    conn.reply(m.chat, 'Maaf, menu sedang error', m)

    throw e

  }

}

handler.help = ['menu', 'help', '?']

handler.tags = ['main']

handler.command = /^(menu|help|\?)$/i

handler.owner = false

handler.mods = false

handler.premium = false

handler.group = false

handler.private = false

//handler.register = true



handler.admin = false

handler.botAdmin = false



handler.fail = null

handler.exp = 3



module.exports = handler



const more = String.fromCharCode(8206)

const readMore = more.repeat(4001)



function clockString(ms) {

  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)

  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60

  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60

  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')

}